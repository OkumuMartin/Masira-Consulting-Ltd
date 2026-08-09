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
const inflated = zlib.inflateSync(Buffer.concat(idatData));

const rowCounts = [];
for (let y = 0; y < height; y++) {
  const rowOffset = y * (1 + width * 4);
  let count = 0;
  const pixels = [];
  for (let x = 0; x < width; x++) {
    const px = rowOffset + 1 + x * 4;
    const a = inflated[px + 3];
    if (a >= 128) {
      count++;
      if (pixels.length < 5) {
        const r = inflated[px];
        const g = inflated[px + 1];
        const b = inflated[px + 2];
        pixels.push({ x, r, g, b });
      }
    }
  }
  if (count > 0) {
    rowCounts.push({ y, count, pixels });
  }
}

console.log('Rows with opaque pixels:', rowCounts.length);
console.log('First 20 rows with opaque pixels:');
for (const row of rowCounts.slice(0, 20)) {
  const pixelStr = row.pixels.map(p => `(${p.x},#${[p.r,p.g,p.b].map(c=>c.toString(16).padStart(2,'0')).join('')})`).join(' ');
  console.log(`  y=${row.y}: ${row.count} pixels => ${pixelStr}`);
}
