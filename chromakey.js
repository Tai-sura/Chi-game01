const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

function isBg(r, g, b) {
  const mag = r + b - 2 * g;
  if (r > 120 && b > 120 && g < 175 && mag > 55) return true;
  if (r > 200 && b > 180 && g < 200 && mag > 40) return true;
  if (r > 248 && g > 248 && b > 248) return true;
  return false;
}

function cleanPng(inPath, outPath) {
  const src = PNG.sync.read(fs.readFileSync(inPath));
  const { width: w, height: h, data } = src;

  // pass 1: hard key magenta / near white
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (isBg(r, g, b)) data[i + 3] = 0;
  }

  // flood fill from borders for leftover pink connected to edges
  const visited = new Uint8Array(w * h);
  const q = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const idx = y * w + x;
    if (visited[idx]) return;
    visited[idx] = 1;
    q.push(idx);
  };
  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }
  while (q.length) {
    const idx = q.pop();
    const i = idx * 4;
    const a = data[i + 3];
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (a > 24 && !isBg(r, g, b)) continue;
    data[i + 3] = 0;
    const x = idx % w;
    const y = (idx / w) | 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  // pass 3: fringe cleanup near transparent
  const copy = Buffer.from(data);
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
      if (nearT && mag > 30 && g < 195) {
        const fade = Math.min(1, (mag - 30) / 110);
        data[i + 3] = Math.max(0, Math.floor(copy[i + 3] * (1 - fade)));
        // neutralize pink fringe into ink gray
        data[i] = Math.floor(r * 0.2 + g * 0.55);
        data[i + 1] = Math.floor(r * 0.12 + g * 0.7);
        data[i + 2] = Math.floor(g * 0.5 + b * 0.15);
      } else if (isBg(r, g, b)) {
        data[i + 3] = 0;
      }
    }
  }

  fs.writeFileSync(outPath, PNG.sync.write(src));
  const cornerA = data[3];
  const mid = ((h / 2) | 0) * w + ((w / 2) | 0);
  console.log(
    path.basename(outPath),
    `cornerA=${cornerA}`,
    `midA=${data[mid * 4 + 3]}`,
    `${w}x${h}`
  );
}

const dir = path.join(__dirname, "assets");
cleanPng(path.join(dir, "_tmp-hunter.png"), path.join(dir, "player-hunter-ink-clear.png"));
cleanPng(path.join(dir, "_tmp-arrow.png"), path.join(dir, "arrow-ink-clear.png"));
