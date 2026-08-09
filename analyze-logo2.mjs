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

const opaquePixels = [];

for (let y = 0; y < height; y++) {
  const rowOffset = y * (1 + width * 4);
  for (let x = 0; x < width; x++) {
    const px = rowOffset + 1 + x * 4;
    const r = inflated[px];
    const g = inflated[px + 1];
    const b = inflated[px + 2];
    const a = inflated[px + 3];
    if (a >= 128) {
      opaquePixels.push({ x, y, r, g, b, a });
    }
  }
}

console.log('Total opaque pixels:', opaquePixels.length);

if (opaquePixels.length > 0) {
  const xs = opaquePixels.map(p => p.x);
  const ys = opaquePixels.map(p => p.y);
  console.log('X range:', Math.min(...xs), '-', Math.max(...xs));
  console.log('Y range:', Math.min(...ys), '-', Math.max(...ys));
  
  // Show first 10 opaque pixels
  console.log('First 10 opaque pixels:');
  for (let i = 0; i < Math.min(10, opaquePixels.length); i++) {
    const p = opaquePixels[i];
    const hex = '#' + [p.r, p.g, p.b].map(c => c.toString(16).padStart(2, '0')).join('');
    console.log(`  (${p.x},${p.y}) => rgba(${p.r},${p.g},${p.b},${p.a}) ${hex}`);
  }
}
