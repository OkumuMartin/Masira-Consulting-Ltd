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
        case 0: // None
          val = raw;
          break;
        case 1: // Sub
          val = (raw + left) % 256;
          break;
        case 2: // Up
          val = (raw + above) % 256;
          break;
        case 3: // Average
          val = (raw + Math.floor((left + above) / 2)) % 256;
          break;
        case 4: // Paeth
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
        default:
          val = raw;
      }
      pixels[dstIdx + c] = val;
    }
  }
}

const colorCounts = {};
let totalPixels = 0;

for (let i = 0; i < width * height; i++) {
  const r = pixels[i * 4];
  const g = pixels[i * 4 + 1];
  const b = pixels[i * 4 + 2];
  const a = pixels[i * 4 + 3];
  
  if (a > 10) {
    totalPixels++;
    const qr = Math.round(r / 16) * 16;
    const qg = Math.round(g / 16) * 16;
    const qb = Math.round(b / 16) * 16;
    const key = `${qr},${qg},${qb}`;
    colorCounts[key] = (colorCounts[key] || 0) + 1;
  }
}

const sorted = Object.entries(colorCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 30);

console.log('Total non-transparent pixels:', totalPixels);
console.log('Top 30 colors (quantized to 16):');
sorted.forEach(([color, count]) => {
  const [r, g, b] = color.split(',').map(Number);
  const hex = '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
  const pct = ((count / totalPixels) * 100).toFixed(2);
  console.log(`  ${hex} => ${count} (${pct}%)`);
});

// Get bounding box of opaque pixels
let minX = width, maxX = 0, minY = height, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const a = pixels[(y * width + x) * 4 + 3];
    if (a > 10) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
console.log('Bounding box:', minX, minY, maxX, maxY);
console.log('Size:', maxX - minX + 1, 'x', maxY - minY + 1);
