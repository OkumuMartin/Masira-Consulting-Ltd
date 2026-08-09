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

let minX = width, maxX = 0, minY = height, maxY = 0;
const colors = [];

for (let y = 0; y < height; y++) {
  const rowOffset = y * (1 + width * 4);
  for (let x = 0; x < width; x++) {
    const px = rowOffset + 1 + x * 4;
    const r = inflated[px];
    const g = inflated[px + 1];
    const b = inflated[px + 2];
    const a = inflated[px + 3];
    if (a >= 128) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      colors.push([r, g, b]);
    }
  }
}

console.log('Bounding box:', minX, minY, maxX, maxY);
console.log('Size:', maxX - minX + 1, 'x', maxY - minY + 1);
console.log('Opaque pixels:', colors.length);

const unique = new Map();
for (const [r, g, b] of colors) {
  const key = `${r},${g},${b}`;
  unique.set(key, (unique.get(key) || 0) + 1);
}

const sorted = [...unique.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20);
console.log('Top exact colors:');
for (const [color, count] of sorted) {
  const [r, g, b] = color.split(',').map(Number);
  const hex = '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
  console.log(`  ${hex} => ${count}`);
}
