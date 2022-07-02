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
