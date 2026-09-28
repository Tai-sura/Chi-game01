(() => {
  const D = () => window.GAME_DATA;
  const STORAGE_KEY = "narrative-tang-shooter-v2";
  const ALL_LEVELS = () => D().levels.map((l) => l.id);
  const SFX = () => window.GameSFX;

  const state = {
    mode: "practice", // practice | challenge
    levelId: null,
    questions: [],
    qIndex: 0,
    score: 0,
    combo: 0,
    lives: 5,
    unlocked: [],
    wrong: [],
    running: false,
    paused: false,
    targets: [],
    bullets: [],
    particles: [],
    player: { x: 0.5, y: 0.88, w: 46, aim: -Math.PI / 2, drawPull: 0 },
    keys: {},
    pointerDown: false,
    pointerX: 0.5,
    feedbackTimer: 0,
    orderNext: 0,
    pauseNext: 0,
    spawnCooldown: 0,
    flash: 0,
    highScore: 0,
  };

  const art = {
    player: null,
    arena: null,
    arrow: null,
  };

  /** 洋紅底去背（執行時補刀，避免殘邊） */
  function chromaKeyMagenta(img) {
    try {
      const c = document.createElement("canvas");
      c.width = img.naturalWidth || img.width;
      c.height = img.naturalHeight || img.height;
      if (!c.width || !c.height) return img;
      const cctx = c.getContext("2d", { willReadFrequently: true });
      cctx.clearRect(0, 0, c.width, c.height);
      cctx.drawImage(img, 0, 0);
      const data = cctx.getImageData(0, 0, c.width, c.height);
      const d = data.data;
      const w = c.width;
      const h = c.height;
      const isBg = (r, g, b) => {
        const mag = r + b - 2 * g;
        return (
          (r > 120 && b > 120 && g < 175 && mag > 55) ||
          (r > 200 && b > 180 && g < 200 && mag > 40) ||
          (r > 248 && g > 248 && b > 248)
        );
      };
      for (let i = 0; i < d.length; i += 4) {
        if (isBg(d[i], d[i + 1], d[i + 2])) d[i + 3] = 0;
      }
      const copy = new Uint8ClampedArray(d);
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const i = (y * w + x) * 4;
          if (copy[i + 3] === 0) continue;
          const r = copy[i];
          const g = copy[i + 1];
          const b = copy[i + 2];
          const mag = r + b - 2 * g;
          let nearT = false;
          for (let oy = -1; oy <= 1 && !nearT; oy++) {
            for (let ox = -1; ox <= 1; ox++) {
              if (copy[((y + oy) * w + (x + ox)) * 4 + 3] < 30) {
                nearT = true;
                break;
              }
            }
          }
          if (nearT && mag > 28 && g < 200) {
            const fade = Math.min(1, (mag - 28) / 100);
            d[i + 3] = Math.max(0, Math.floor(copy[i + 3] * (1 - fade)));
            d[i] = Math.floor(r * 0.2 + g * 0.55);
            d[i + 1] = Math.floor(r * 0.12 + g * 0.7);
            d[i + 2] = Math.floor(g * 0.5 + b * 0.15);
          }
        }
      }
      cctx.putImageData(data, 0, 0);
      return cropToAlpha(c, d, w, h);
    } catch (err) {
      console.warn("去背失敗，改用原圖", err);
      return img;
    }
  }

  /** 裁掉透明邊，避免陰影畫出整塊矩形 */
  function cropToAlpha(srcCanvas, data, w, h) {
    let minX = w;
    let minY = h;
    let maxX = 0;
    let maxY = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (data[(y * w + x) * 4 + 3] > 12) {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX <= minX || maxY <= minY) return srcCanvas;
    const pad = 2;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(w - 1, maxX + pad);
    maxY = Math.min(h - 1, maxY + pad);
    const cw = maxX - minX + 1;
    const ch = maxY - minY + 1;
    const out = document.createElement("canvas");
    out.width = cw;
    out.height = ch;
    out.getContext("2d").drawImage(srcCanvas, minX, minY, cw, ch, 0, 0, cw, ch);
    return out;
  }

  function loadSprite(src, key) {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      art[key] = chromaKeyMagenta(img);
    };
    img.onerror = () => {
      console.warn("精靈載入失敗:", src);
    };
    img.src = src + "?v=clear5";
  }

  function loadArt() {
    loadSprite("assets/player-hunter-ink-clear.png", "player");
    loadSprite("assets/arrow-ink-clear.png", "arrow");
    const a = new Image();
    a.src = "assets/bg-arena.png?v=clear5";
    a.onload = () => {
      art.arena = a;
    };
  }

  const el = {
    screens: {},
    prompt: null,
    progress: null,
    score: null,
    combo: null,
    hearts: null,
    levelName: null,
    toast: null,
    canvas: null,
    overlay: null,
    resultTitle: null,
    resultScore: null,
    resultDetail: null,
    wrongList: null,
    levelList: null,
    studyBody: null,
  };

  let ctx = null;
  let raf = 0;
  let lastTs = 0;
  let dpr = 1;

  function loadSave() {
    state.unlocked = ALL_LEVELS();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (typeof data.highScore === "number") state.highScore = data.highScore;
    } catch (_) {}
  }

  function save() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ unlocked: ALL_LEVELS(), highScore: state.highScore })
    );
  }

  function syncSoundBtn() {
    const on = SFX() ? SFX().isEnabled() : true;
    document.querySelectorAll("[data-sound-toggle]").forEach((btn) => {
      btn.textContent = on ? "🔊 音效開" : "🔇 音效關";
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function showScreen(id) {
    Object.entries(el.screens).forEach(([key, node]) => {
      node.classList.toggle("active", key === id);
    });
    if (id !== "game") {
      state.running = false;
      cancelAnimationFrame(raf);
    } else {
      requestAnimationFrame(() => resizeCanvas());
    }
  }

  function toast(msg, type = "") {
    el.toast.textContent = msg;
    el.toast.className = "toast show" + (type ? " " + type : "");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      el.toast.classList.remove("show");
    }, type === "ok" || type === "bad" ? 1800 : 2200);
  }

  function play(name) {
    const s = SFX();
    if (s && typeof s[name] === "function") s[name]();
  }

  function heartsText() {
    if (state.mode === "practice") return "練習 · 無限命";
    return "❤".repeat(Math.max(0, state.lives)) + "♡".repeat(Math.max(0, 5 - state.lives));
  }

  function updateHud() {
    const q = state.questions[state.qIndex];
    const total = state.questions.length;
    el.score.textContent = `分數 ${state.score}`;
    el.combo.textContent = state.combo > 1 ? `連對 ×${state.combo}` : "";
    el.hearts.textContent = heartsText();
    el.progress.style.width = `${(state.qIndex / Math.max(1, total)) * 100}%`;
    if (q) {
      let prompt = q.prompt;
      if (q.type === "order") {
        prompt += `\n已完成：${state.orderNext}/${q.answer.length}`;
      }
      if (q.type === "pause") {
        const done = q.segments.slice(0, state.pauseNext).join("／");
        prompt = `《${q.poem || ""}》停頓射擊\n${q.full}\n已擊中：${done || "（尚未）"} → 下一個？`;
      }
      el.prompt.textContent = prompt;
    }
    const levelMeta = D().levels.find((l) => l.id === state.levelId);
    el.levelName.textContent = levelMeta ? levelMeta.name : "";
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function wrongDistractors(correctSeg, allSegs) {
    const pool = new Set();
    allSegs.forEach((s) => {
      if (s !== correctSeg) pool.add(s);
    });
    // 常見錯切
    if (correctSeg.length >= 2) {
      pool.add(correctSeg.slice(0, 1));
      pool.add(correctSeg.slice(1));
    }
    if (correctSeg.length >= 3) {
      pool.add(correctSeg.slice(0, 2));
    }
    pool.delete(correctSeg);
    return shuffle([...pool]).slice(0, 3);
  }

  function clearArena() {
    state.targets = [];
    state.bullets = [];
    state.particles = [];
    state.spawnCooldown = 0;
  }

  function spawnChoiceTargets(q) {
    clearArena();
    const labels = q.options.map((text, i) => ({
      text,
      correct: i === q.answer,
      kind: "choice",
    }));
    placeTargets(shuffle(labels));
  }

  function spawnOrderTargets(q) {
    clearArena();
    const labels = shuffle(q.options).map((text) => ({
      text,
      correct: true,
      kind: "order",
      orderValue: text,
    }));
    placeTargets(labels);
  }

  function spawnPauseTargets(q) {
    clearArena();
    const need = q.segments[state.pauseNext];
    const distract = wrongDistractors(need, q.segments);
    const labels = shuffle([
      { text: need, correct: true, kind: "pause" },
      ...distract.map((t) => ({ text: t, correct: false, kind: "pause" })),
    ]).slice(0, Math.min(4, 1 + distract.length));
    placeTargets(labels);
  }

  function placeTargets(labels) {
    const n = labels.length;
    labels.forEach((item, i) => {
      const col = (i + 0.5) / n;
      const maxW = n >= 4 ? 0.22 : n === 3 ? 0.26 : 0.3;
      state.targets.push({
        id: Math.random().toString(36).slice(2),
        text: item.text,
        correct: item.correct,
        kind: item.kind,
        orderValue: item.orderValue,
        x: 0.12 + col * 0.76 + (Math.random() * 0.03 - 0.015),
        y: 0.18 + Math.random() * 0.08,
        vx: (Math.random() * 0.04 + 0.02) * (Math.random() < 0.5 ? -1 : 1),
        vy: 0.03 + Math.random() * 0.025,
        w: Math.min(maxW, 0.1 + item.text.length * 0.026),
        h: 0.09,
        hit: false,
        bob: Math.random() * Math.PI * 2,
      });
    });
  }

  function startQuestion() {
    const q = state.questions[state.qIndex];
    if (!q) {
      endLevel(true);
      return;
    }
    state.orderNext = 0;
    state.pauseNext = 0;
    state.feedbackTimer = 0;
    if (q.type === "choice") spawnChoiceTargets(q);
    else if (q.type === "order") spawnOrderTargets(q);
    else if (q.type === "pause") spawnPauseTargets(q);
    updateHud();
  }

  function loseLife(reason) {
    state.combo = 0;
    state.flash = 0.35;
    play("bad");
    if (state.mode === "challenge") {
      state.lives -= 1;
      if (state.lives <= 0) {
        toast(reason || "挑戰失敗", "bad");
        updateHud();
        setTimeout(() => endLevel(false), 700);
        return true;
      }
    }
    toast(reason || "答錯了", "bad");
    updateHud();
    return false;
  }

  function onCorrect(explain) {
    state.combo += 1;
    const bonus = Math.min(50, (state.combo - 1) * 15);
    state.score += 100 + bonus;
    play("ok");
    if (state.mode === "practice" || state.mode === "challenge") {
      toast((explain || "答對了！") + (bonus ? ` (+${100 + bonus})` : ""), "ok");
    }
    updateHud();
  }

  function advanceOrFinish() {
    state.qIndex += 1;
    if (state.qIndex >= state.questions.length) {
      endLevel(true);
    } else {
      setTimeout(() => {
        if (state.running) startQuestion();
      }, 650);
    }
  }

  function handleTargetHit(t) {
    if (t.hit || state.feedbackTimer > 0) return;
    const q = state.questions[state.qIndex];
    if (!q) return;

    if (q.type === "choice") {
      t.hit = true;
      burst(t.x, t.y, t.correct);
      if (t.correct) {
        onCorrect(q.explain);
        state.feedbackTimer = 0.55;
        state.targets.forEach((x) => (x.hit = true));
        setTimeout(() => advanceOrFinish(), 700);
      } else {
        state.wrong.push({ prompt: q.prompt, explain: q.explain, picked: t.text });
        const dead = loseLife(`打錯了。${q.explain}`);
        if (!dead) {
          state.feedbackTimer = 0.45;
          // 留下正確靶，清掉錯誤靶後可再射
          state.targets = state.targets.filter((x) => !x.hit || x.correct);
          state.targets.forEach((x) => {
            if (x.correct) x.hit = false;
          });
          if (state.targets.filter((x) => !x.hit).length === 0) spawnChoiceTargets(q);
        }
      }
      return;
    }

    if (q.type === "order") {
      const expect = q.answer[state.orderNext];
      if (t.orderValue === expect) {
        t.hit = true;
        burst(t.x, t.y, true);
        state.orderNext += 1;
        updateHud();
        if (state.orderNext >= q.answer.length) {
          onCorrect(q.explain);
          state.feedbackTimer = 0.55;
          setTimeout(() => advanceOrFinish(), 700);
        } else {
          toast(`正確！下一個：${q.answer[state.orderNext]}`, "ok");
        }
      } else {
        burst(t.x, t.y, false);
        state.wrong.push({ prompt: q.prompt, explain: q.explain, picked: t.text });
        const dead = loseLife(`順序錯了。應為：${q.answer.join(" → ")}`);
        if (!dead) {
          state.orderNext = 0;
          spawnOrderTargets(q);
          updateHud();
        }
      }
      return;
    }

    if (q.type === "pause") {
      const expect = q.segments[state.pauseNext];
      if (t.text === expect && t.correct) {
        t.hit = true;
        burst(t.x, t.y, true);
        state.pauseNext += 1;
        updateHud();
        if (state.pauseNext >= q.segments.length) {
          onCorrect(q.explain);
          state.feedbackTimer = 0.55;
          setTimeout(() => advanceOrFinish(), 700);
        } else {
          toast("停頓正確，繼續！", "ok");
          setTimeout(() => {
            if (state.running && state.questions[state.qIndex] === q) spawnPauseTargets(q);
          }, 280);
        }
      } else {
        burst(t.x, t.y, false);
        state.wrong.push({ prompt: q.full || q.prompt, explain: q.explain, picked: t.text });
        const dead = loseLife(`停頓不對。${q.explain}`);
        if (!dead) {
          state.pauseNext = 0;
          spawnPauseTargets(q);
          updateHud();
        }
      }
    }
  }

  function burst(x, y, ok) {
    for (let i = 0; i < 10; i++) {
      state.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        life: 0.4 + Math.random() * 0.3,
        color: ok ? "#2d6a4f" : "#9b2226",
      });
    }
  }

  function shootAt(nx, ny) {
    if (!state.running || state.paused || state.feedbackTimer > 0) return;
    const px = state.player.x;
    const py = state.player.y;
    const angle = Math.atan2(ny - py, nx - px);
    state.player.aim = angle;
    state.player.drawPull = 0.22;
    // 從弓前方射出
    const muzzle = 0.055;
    play("shoot");
    state.bullets.push({
      x: px + Math.cos(angle) * muzzle,
      y: py + Math.sin(angle) * muzzle,
      tx: nx,
      ty: ny,
      angle,
      t: 0,
      speed: 3.6,
      cx: px + Math.cos(angle) * muzzle,
      cy: py + Math.sin(angle) * muzzle,
    });
  }

  function tryHitNearest(nx, ny) {
    // 觸控／點擊：優先直接判定點中的靶
    let hit = null;
    let best = 1;
    state.targets.forEach((t) => {
      if (t.hit) return;
      const dx = Math.abs(nx - t.x);
      const dy = Math.abs(ny - t.y);
      if (dx < t.w * 0.55 && dy < t.h * 0.7) {
        const d = dx + dy;
        if (d < best) {
          best = d;
          hit = t;
        }
      }
    });
    if (hit) {
      shootAt(hit.x, hit.y);
      // 短延遲後結算，讓子彈看得見
      setTimeout(() => handleTargetHit(hit), 120);
      return;
    }
    shootAt(nx, ny);
  }

  function endLevel(success) {
    state.running = false;
    cancelAnimationFrame(raf);
    state.unlocked = ALL_LEVELS();
    if (success) play("win");
    if (state.score > state.highScore) {
      state.highScore = state.score;
      save();
    } else {
      save();
    }
    el.resultTitle.textContent = success ? "本關完成！" : "挑戰結束";
    el.resultScore.textContent = String(state.score);
    const total = state.questions.length;
    const done = success ? total : state.qIndex;
    el.resultDetail.textContent = success
      ? `模式：${state.mode === "practice" ? "練習" : "挑戰"} · 完成 ${done}/${total} 題 · 最高分 ${state.highScore}`
      : `模式：挑戰 · 前進至第 ${state.qIndex + 1}/${total} 題 · 最高分 ${state.highScore}`;
    el.wrongList.innerHTML = "";
    if (state.wrong.length) {
      state.wrong.slice(-8).forEach((w) => {
        const li = document.createElement("li");
        li.textContent = `${w.prompt.replace(/\n/g, " ")} → ${w.explain}`;
        el.wrongList.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.textContent = "沒有錯題紀錄，很棒！";
      el.wrongList.appendChild(li);
    }
    showScreen("result");
    renderLevels();
  }

  function startLevel(levelId) {
    state.unlocked = ALL_LEVELS();
    if (SFX()) SFX().unlock();
    play("click");
    state.levelId = levelId;
    state.questions = D().getLevelQuestions(levelId);
    state.qIndex = 0;
    state.score = 0;
    state.combo = 0;
    state.lives = 5;
    state.wrong = [];
    state.paused = false;
    state.running = true;
    el.overlay.classList.remove("show");
    showScreen("game");
    resizeCanvas();
    startQuestion();
    lastTs = performance.now();
    loop(lastTs);
  }

  function resizeCanvas() {
    const canvas = el.canvas;
    if (!canvas || !canvas.parentElement) return;
    const stage = canvas.parentElement;
    const rect = stage.getBoundingClientRect();
    const cssW = Math.max(1, Math.floor(rect.width));
    const cssH = Math.max(1, Math.floor(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const needW = Math.floor(cssW * dpr);
    const needH = Math.floor(cssH * dpr);
    if (canvas.width !== needW || canvas.height !== needH) {
      canvas.width = needW;
      canvas.height = needH;
    }
    canvas.style.width = cssW + "px";
    canvas.style.height = cssH + "px";
    ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function bindViewportResize() {
    const stage = el.canvas && el.canvas.parentElement;
    if (stage && typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => {
        if (state.running || el.screens.game?.classList.contains("active")) {
          resizeCanvas();
        }
      });
      ro.observe(stage);
    }
    const onResize = () => {
      if (state.running || el.screens.game?.classList.contains("active")) {
        resizeCanvas();
      }
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", () => {
      setTimeout(onResize, 180);
      setTimeout(onResize, 450);
    });
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", onResize);
    }
  }

  function W() {
    return el.canvas.clientWidth;
  }
  function H() {
    return el.canvas.clientHeight;
  }

  function loop(ts) {
    if (!state.running) return;
    const dt = Math.min(0.033, (ts - lastTs) / 1000);
    lastTs = ts;
    if (!state.paused) update(dt);
    draw();
    raf = requestAnimationFrame(loop);
  }

  function update(dt) {
    if (state.feedbackTimer > 0) state.feedbackTimer -= dt;
    if (state.flash > 0) state.flash -= dt;
    if (state.player.drawPull > 0) state.player.drawPull = Math.max(0, state.player.drawPull - dt);

    // 鍵盤移動
    let move = 0;
    if (state.keys["ArrowLeft"] || state.keys["a"] || state.keys["A"]) move -= 1;
    if (state.keys["ArrowRight"] || state.keys["d"] || state.keys["D"]) move += 1;
    if (state.pointerDown) {
      const dx = state.pointerX - state.player.x;
      if (Math.abs(dx) > 0.01) move = Math.sign(dx);
    }
    state.player.x = Math.max(0.08, Math.min(0.92, state.player.x + move * dt * 0.85));

    // 準星：指向最近靶或指標
    let aimX = state.player.x;
    let aimY = 0.25;
    let best = 99;
    state.targets.forEach((t) => {
      if (t.hit) return;
      const d = Math.abs(t.x - state.player.x) * 0.6 + t.y;
      if (d < best) {
        best = d;
        aimX = t.x;
        aimY = t.y;
      }
    });
    if (state.pointerDown) {
      aimX = state.pointerX;
      aimY = Math.min(0.7, Math.max(0.1, state.player.y - 0.35));
    }
    if (!state.bullets.length || state.player.drawPull <= 0) {
      const desired = Math.atan2(aimY - state.player.y, aimX - state.player.x);
      let diff = desired - state.player.aim;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      state.player.aim += diff * Math.min(1, dt * 8);
    }

    state.targets.forEach((t) => {
      if (t.hit) return;
      t.bob += dt * 2.2;
      t.x += t.vx * dt;
      t.y += t.vy * dt * (0.55 + 0.15 * Math.sin(t.bob));
      if (t.x < 0.1 || t.x > 0.9) t.vx *= -1;
      if (t.y > 0.72) {
        t.y = 0.72;
        t.vy *= -0.3;
      }
    });

    state.bullets.forEach((b) => {
      b.t += dt * b.speed;
      const p = Math.min(1, b.t);
      b.cx = b.x + (b.tx - b.x) * p;
      b.cy = b.y + (b.ty - b.y) * p;
      if (p >= 1) b.dead = true;
    });
    state.bullets = state.bullets.filter((b) => !b.dead);

    // 子彈碰撞（鍵盤射空白時）
    state.bullets.forEach((b) => {
      if (b.resolved) return;
      state.targets.forEach((t) => {
        if (t.hit || b.resolved) return;
        if (Math.abs(b.cx - t.x) < t.w * 0.5 && Math.abs(b.cy - t.y) < t.h * 0.55) {
          b.resolved = true;
          b.dead = true;
          handleTargetHit(t);
        }
      });
    });

    state.particles.forEach((p) => {
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    });
    state.particles = state.particles.filter((p) => p.life > 0);
  }

  function drawRounded(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function draw() {
    const w = W();
    const h = H();
    ctx.clearRect(0, 0, w, h);

    if (art.arena && art.arena.complete) {
      const iw = art.arena.naturalWidth;
      const ih = art.arena.naturalHeight;
      const scale = Math.max(w / iw, h / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.globalAlpha = 0.55;
      ctx.drawImage(art.arena, (w - dw) / 2, (h - dh) / 2, dw, dh);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(232, 238, 242, 0.28)";
      ctx.fillRect(0, 0, w, h);
    } else {
      ctx.fillStyle = "rgba(47, 111, 106, 0.08)";
      ctx.beginPath();
      ctx.moveTo(0, h * 0.55);
      ctx.quadraticCurveTo(w * 0.25, h * 0.42, w * 0.5, h * 0.52);
      ctx.quadraticCurveTo(w * 0.75, h * 0.62, w, h * 0.48);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.fill();
    }

    // 靶
    state.targets.forEach((t) => {
      if (t.hit) return;
      const tw = t.w * w;
      const th = t.h * h;
      const x = t.x * w - tw / 2;
      const y = t.y * h - th / 2 + Math.sin(t.bob) * 4;
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.strokeStyle = "rgba(26,35,50,0.2)";
      ctx.lineWidth = 2;
      drawRounded(x, y, tw, th, 12);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#1a2332";
      ctx.font = `600 ${Math.max(14, Math.min(20, tw / (t.text.length * 0.7)))}px "Noto Serif TC", serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(t.text, t.x * w, y + th / 2);
    });

    // 箭矢（水墨細箭）
    state.bullets.forEach((b) => {
      const bx = b.cx * w;
      const by = b.cy * h;
      const ang = b.angle != null ? b.angle : Math.atan2(b.ty - b.y, b.tx - b.x);
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(ang + Math.PI / 2);
      if (art.arrow) {
        const aw = 48;
        const ah = 86;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.drawImage(art.arrow, -aw / 2, -ah * 0.62, aw, ah);
      } else {
        ctx.fillStyle = "#3a2a1c";
        ctx.fillRect(-1.5, -22, 3, 34);
        ctx.fillStyle = "#1a2332";
        ctx.beginPath();
        ctx.moveTo(0, -28);
        ctx.lineTo(5, -14);
        ctx.lineTo(-5, -14);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#2f6f6a";
        ctx.fillRect(-4, 8, 8, 4);
      }
      ctx.restore();
    });

    // 粒子（墨點）
    state.particles.forEach((p) => {
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // 水墨獵人角色
    const px = state.player.x * w;
    const py = state.player.y * h;
    const pull = state.player.drawPull > 0 ? 1 + state.player.drawPull * 0.18 : 1;
    const faceLeft = Math.cos(state.player.aim) < -0.05;

    // 腳下淡墨影
    ctx.fillStyle = "rgba(26, 35, 50, 0.14)";
    ctx.beginPath();
    ctx.ellipse(px, py + 14, 28, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    if (art.player) {
      const size = Math.min(Math.max(w * 0.26, 72), Math.min(h * 0.28, 176)) * pull;
      ctx.save();
      ctx.translate(px, py + 10);
      const lean = Math.max(-0.4, Math.min(0.4, state.player.aim + Math.PI / 2));
      ctx.rotate(lean * 0.35);
      if (faceLeft) ctx.scale(-1, 1);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.drawImage(art.player, -size * 0.5, -size * 0.9, size, size);
      ctx.restore();
    } else {
      ctx.save();
      ctx.translate(px, py);
      ctx.fillStyle = "#1a2332";
      ctx.beginPath();
      ctx.arc(0, -28, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-7, -18, 14, 26);
      ctx.strokeStyle = "#5c4030";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(faceLeft ? -12 : 12, -8, 18, faceLeft ? 2.2 : -0.9, faceLeft ? 4.2 : 0.9);
      ctx.stroke();
      ctx.restore();
    }

    if (state.flash > 0) {
      ctx.fillStyle = `rgba(155,34,38,${state.flash * 0.35})`;
      ctx.fillRect(0, 0, w, h);
    }
  }

  function canvasPos(e) {
    const rect = el.canvas.getBoundingClientRect();
    const src = e.touches && e.touches[0] ? e.touches[0] : e.changedTouches && e.changedTouches[0] ? e.changedTouches[0] : e;
    return {
      x: (src.clientX - rect.left) / rect.width,
      y: (src.clientY - rect.top) / rect.height,
    };
  }

  function renderLevels() {
    state.unlocked = ALL_LEVELS();
    el.levelList.innerHTML = "";
    D().levels.forEach((lv) => {
      const row = document.createElement("div");
      row.className = "level-item";
      row.innerHTML = `<div><h4>${lv.name}</h4><p>${lv.desc}</p></div>`;
      const btn = document.createElement("button");
      btn.textContent = "開始";
      btn.addEventListener("click", () => startLevel(lv.id));
      row.appendChild(btn);
      el.levelList.appendChild(row);
    });
  }

  function renderStudy() {
    const s = D().studyCard;
    let html = `<div class="study-block"><h3>記敘人稱</h3><ul>`;
    s.person.forEach((p) => {
      html += `<li><strong>${p.name}</strong>：${p.def}<br><span class="muted">效果：${p.effect}</span></li>`;
    });
    html += `</ul></div><div class="study-block"><h3>記敘方法</h3><ul>`;
    s.method.forEach((m) => {
      html += `<li><strong>${m.name}</strong>：${m.def}<br>順序：${m.order}<br><span class="muted">效果：${m.effect}</span></li>`;
    });
    html += `</ul></div>`;
    s.poems.forEach((poem) => {
      html += `<div class="study-block"><h3>${poem.title} · ${poem.author}</h3>`;
      poem.lines.forEach((line) => {
        html += `<p class="poem-line">${line}</p>`;
      });
      html += `</div>`;
    });
    el.studyBody.innerHTML = html;
  }

  function bind() {
    document.querySelectorAll("[data-screen]").forEach((node) => {
      el.screens[node.dataset.screen] = node;
    });
    el.prompt = document.getElementById("promptText");
    el.progress = document.getElementById("progressFill");
    el.score = document.getElementById("hudScore");
    el.combo = document.getElementById("hudCombo");
    el.hearts = document.getElementById("hudHearts");
    el.levelName = document.getElementById("hudLevel");
    el.toast = document.getElementById("toast");
    el.canvas = document.getElementById("gameCanvas");
    el.overlay = document.getElementById("pauseOverlay");
    el.resultTitle = document.getElementById("resultTitle");
    el.resultScore = document.getElementById("resultScore");
    el.resultDetail = document.getElementById("resultDetail");
    el.wrongList = document.getElementById("wrongList");
    el.levelList = document.getElementById("levelList");
    el.studyBody = document.getElementById("studyBody");

    const go = (id) => {
      play("click");
      showScreen(id);
    };
    document.getElementById("btnToMode").addEventListener("click", () => {
      if (SFX()) SFX().unlock();
      go("mode");
    });
    document.getElementById("btnHow").addEventListener("click", () => go("how"));
    const openStudy = () => {
      play("click");
      renderStudy();
      showScreen("study");
    };
    document.getElementById("btnStudy").addEventListener("click", openStudy);
    document.getElementById("btnStudyFromLevels").addEventListener("click", openStudy);
    document.querySelectorAll("[data-back]").forEach((btn) => {
      btn.addEventListener("click", () => go(btn.dataset.back));
    });

    document.querySelectorAll("[data-sound-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!SFX()) return;
        SFX().setEnabled(!SFX().isEnabled());
        if (SFX().isEnabled()) {
          SFX().unlock();
          play("click");
        }
        syncSoundBtn();
      });
    });

    document.querySelectorAll(".mode-card").forEach((card) => {
      card.addEventListener("click", () => {
        document.querySelectorAll(".mode-card").forEach((c) => c.classList.remove("selected"));
        card.classList.add("selected");
        state.mode = card.dataset.mode;
        play("click");
      });
    });
    document.getElementById("btnToLevels").addEventListener("click", () => {
      const selected = document.querySelector(".mode-card.selected");
      state.mode = selected ? selected.dataset.mode : "practice";
      play("click");
      renderLevels();
      showScreen("levels");
    });

    document.getElementById("btnPause").addEventListener("click", () => {
      state.paused = !state.paused;
      el.overlay.classList.toggle("show", state.paused);
      play("pause");
    });
    document.getElementById("btnResume").addEventListener("click", () => {
      state.paused = false;
      el.overlay.classList.remove("show");
      play("click");
    });
    document.getElementById("btnQuitLevel").addEventListener("click", () => {
      state.running = false;
      play("click");
      showScreen("levels");
    });
    document.getElementById("btnResultLevels").addEventListener("click", () => go("levels"));
    document.getElementById("btnResultRetry").addEventListener("click", () => startLevel(state.levelId));
    document.getElementById("btnResultNext").addEventListener("click", () => {
      const order = D().levels.map((l) => l.id);
      const idx = order.indexOf(state.levelId);
      const next = order[idx + 1];
      if (next) startLevel(next);
      else go("levels");
    });

    window.addEventListener("keydown", (e) => {
      state.keys[e.key] = true;
      if (!state.running || state.paused) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        // 射向上方最近靶或正前方
        let target = null;
        let best = 99;
        state.targets.forEach((t) => {
          if (t.hit) return;
          const d = Math.abs(t.x - state.player.x) + t.y;
          if (d < best) {
            best = d;
            target = t;
          }
        });
        if (target) tryHitNearest(target.x, target.y);
        else shootAt(state.player.x, 0.2);
      }
      if (e.key === "Escape") {
        document.getElementById("btnPause").click();
      }
    });
    window.addEventListener("keyup", (e) => {
      state.keys[e.key] = false;
    });

    const onDown = (e) => {
      if (!state.running || state.paused) return;
      e.preventDefault();
      const p = canvasPos(e);
      state.pointerDown = true;
      state.pointerX = p.x;
      state.player.x = Math.max(0.08, Math.min(0.92, p.x));
      tryHitNearest(p.x, p.y);
    };
    const onMove = (e) => {
      if (!state.pointerDown) return;
      const p = canvasPos(e);
      state.pointerX = p.x;
      state.player.x = Math.max(0.08, Math.min(0.92, p.x));
    };
    const onUp = () => {
      state.pointerDown = false;
    };

    el.canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    el.canvas.addEventListener("touchstart", onDown, { passive: false });
    el.canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      onMove(e);
    }, { passive: false });
    el.canvas.addEventListener("touchend", onUp);
  }

  function init() {
    loadSave();
    loadArt();
    bind();
    bindViewportResize();
    syncSoundBtn();
    document.getElementById("brandTitle").textContent = D().title;
    document.getElementById("brandSub").textContent = D().subtitle;
    document.title = D().title;
    document.querySelector('.mode-card[data-mode="practice"]').classList.add("selected");
    renderLevels();
    showScreen("home");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
