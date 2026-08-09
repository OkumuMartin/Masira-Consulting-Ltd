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

const colorCounts = {};
let totalPixels = 0;

for (let y = 0; y < height; y++) {
  const rowOffset = y * (1 + width * 4);
  for (let x = 0; x < width; x++) {
    const px = rowOffset + 1 + x * 4;
    const r = inflated[px];
    const g = inflated[px + 1];
    const b = inflated[px + 2];
    const a = inflated[px + 3];
    
    if (a > 10) {
      totalPixels++;
      const qr = Math.round(r / 16) * 16;
      const qg = Math.round(g / 16) * 16;
      const qb = Math.round(b / 16) * 16;
      const key = `${qr},${qg},${qb}`;
      colorCounts[key] = (colorCounts[key] || 0) + 1;
    }
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
