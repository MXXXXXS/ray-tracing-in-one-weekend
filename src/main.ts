import { Color, PpmImg } from './utils/ppmImg'

const pixels: Color[] = []
const w = 16
const h = 16
const total = w * h

for (let hIndex = 0; hIndex < h; hIndex++) {
  for (let wIndex = 0; wIndex < w; wIndex++) {
    const color = Math.round(((hIndex * w + wIndex) / (total - 1)) * 255)
    pixels.push([color, color, color])
  }
}

new PpmImg({
  w,
  h,
  pixels,
}).writeImg('ppmImg.ppm')
