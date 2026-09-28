/* 簡易 Web Audio 音效（無需外部音檔） */
window.GameSFX = (() => {
  let ctx = null;
  let enabled = true;
  const KEY = "narrative-tang-sfx-on";

  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "0") enabled = false;
  } catch (_) {}

  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(freq, dur, type, gain, when) {
    const ac = ensure();
    if (!ac || !enabled) return;
    const t0 = (when || 0) + ac.currentTime;
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain || 0.12, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(ac.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  function noiseBurst(dur, gain) {
    const ac = ensure();
    if (!ac || !enabled) return;
    const n = Math.floor(ac.sampleRate * dur);
    const buf = ac.createBuffer(1, n, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < n; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const src = ac.createBufferSource();
    const g = ac.createGain();
    const f = ac.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 1800;
    src.buffer = buf;
    g.gain.value = gain || 0.08;
    src.connect(f);
    f.connect(g);
    g.connect(ac.destination);
    src.start();
  }

  return {
    isEnabled() {
      return enabled;
    },
    setEnabled(on) {
      enabled = !!on;
      try {
        localStorage.setItem(KEY, enabled ? "1" : "0");
      } catch (_) {}
      if (enabled) ensure();
    },
    unlock() {
      ensure();
    },
    click() {
      tone(660, 0.06, "triangle", 0.06);
    },
    shoot() {
      noiseBurst(0.05, 0.05);
      tone(280, 0.05, "triangle", 0.05);
      tone(520, 0.07, "sine", 0.04, 0.03);
    },
    ok() {
      tone(523.25, 0.1, "sine", 0.1);
      tone(659.25, 0.12, "sine", 0.1, 0.08);
      tone(783.99, 0.16, "sine", 0.09, 0.16);
    },
    bad() {
      tone(180, 0.18, "sawtooth", 0.07);
      tone(140, 0.22, "sawtooth", 0.05, 0.06);
    },
    win() {
      [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.18, "triangle", 0.09, i * 0.1));
    },
    pause() {
      tone(300, 0.08, "sine", 0.05);
    },
  };
})();
