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

for (let y = 0; y < height; y++) {
  const rowOffset = y * (1 + width * 4);
  let count = 0;
  const xs = [];
  for (let x = 0; x < width; x++) {
    const px = rowOffset + 1 + x * 4;
    const a = inflated[px + 3];
    if (a >= 128) {
      count++;
      xs.push(x);
    }
  }
  if (count > 0) {
    const pixel = xs[0];
    const r = inflated[rowOffset + 1 + pixel * 4];
    const g = inflated[rowOffset + 1 + pixel * 4 + 1];
    const b = inflated[rowOffset + 1 + pixel * 4 + 2];
    const hex = '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
    console.log(`y=${y}: ${count}px at x=${xs.join(',')} color=${hex}`);
  }
}
