import { writeFileSync } from 'fs'

export type Color = [r: number, g: number, b: number]

export class PpmImg {
  w: number
  h: number
  pixels: Color[]

  constructor({ w, h, pixels }: { w: number; h: number; pixels: Color[] }) {
    this.w = w
    this.h = h
    this.pixels = pixels
  }

  writeImg(filePath: string) {
    writeFileSync(
      filePath,
      `P3
${this.w} ${this.h}
255
${this.pixels.map((color) => color.join(' ')).join('\n')}
`
    )
  }
}

export function writeTextImg() {
  // 测试
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
}
