import fs from 'fs';
import zlib from 'zlib';

const buf = fs.readFileSync('src/assets/logo.png');
let offset = 8;
const idatData = [];
while (offset < buf.length) {
  const len = buf.readUInt32BE(offset);
  const type = buf.toString('ascii', offset + 4, offset + 8);
  const data = buf.slice(offset + 8, offset + 8 + len);
  if (type === 'IDAT') idatData.push(data);
  offset += 12 + len;
}

const width = 596;
const height = 596;
const compressed = Buffer.concat(idatData);
const inflated = zlib.inflateSync(compressed);

const pixels = new Uint8Array(width * height * 4);

for (let y = 0; y < height; y++) {
  const rowOffset = y * (1 + width * 4);
  const filterType = inflated[rowOffset];
  
  for (let x = 0; x < width; x++) {
    const srcIdx = rowOffset + 1 + x * 4;
    const dstIdx = (y * width + x) * 4;
    
    for (let c = 0; c < 4; c++) {
      let raw = inflated[srcIdx + c];
      let left = x > 0 ? pixels[dstIdx + c - 4] : 0;
      let above = y > 0 ? pixels[((y - 1) * width + x) * 4 + c] : 0;
      let upperLeft = x > 0 && y > 0 ? pixels[((y - 1) * width + x - 1) * 4 + c] : 0;
      
      let val;
      switch (filterType) {
        case 0: val = raw; break;
        case 1: val = (raw + left) % 256; break;
        case 2: val = (raw + above) % 256; break;
        case 3: val = (raw + Math.floor((left + above) / 2)) % 256; break;
        case 4: {
          const p = left + above - upperLeft;
          const pa = Math.abs(p - left);
          const pb = Math.abs(p - above);
          const pc = Math.abs(p - upperLeft);
          let pr;
          if (pa <= pb && pa <= pc) pr = left;
          else if (pb <= pc) pr = above;
          else pr = upperLeft;
          val = (raw + pr) % 256;
          break;
        }
        default: val = raw;
      }
      pixels[dstIdx + c] = val;
    }
  }
}

// Count exact colors (no quantization)
const exactCounts = {};
let totalOpaque = 0;

for (let i = 0; i < width * height; i++) {
  const r = pixels[i * 4];
  const g = pixels[i * 4 + 1];
  const b = pixels[i * 4 + 2];
  const a = pixels[i * 4 + 3];
  
  if (a > 10) {
    totalOpaque++;
    const key = `${r},${g},${b}`;
    exactCounts[key] = (exactCounts[key] || 0) + 1;
  }
}

const sorted = Object.entries(exactCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20);

console.log('Total opaque pixels:', totalOpaque);
console.log('Top 20 exact colors:');
for (const [color, count] of sorted) {
  const [r, g, b] = color.split(',').map(Number);
  const hex = '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
  const pct = ((count / totalOpaque) * 100).toFixed(2);
  console.log(`  ${hex} => ${count} (${pct}%)`);
}
