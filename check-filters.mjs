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

const filterCounts = {};
for (let y = 0; y < height; y++) {
  const rowOffset = y * (1 + width * 4);
  const filterType = inflated[rowOffset];
  filterCounts[filterType] = (filterCounts[filterType] || 0) + 1;
}

console.log('Filter type distribution:', filterCounts);

// Check first few filter bytes
console.log('First 20 filter bytes:');
for (let y = 0; y < 20; y++) {
  console.log(`  y=${y}: filter=${inflated[y * (1 + width * 4)]}`);
}
