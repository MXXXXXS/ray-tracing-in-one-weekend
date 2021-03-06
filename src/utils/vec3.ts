import { Color } from './ppmImg'

export class Vec3 {
  x: number
  y: number
  z: number
  constructor({ x, y, z }: { x: number; y: number; z: number }) {
    this.x = x
    this.y = y
    this.z = z
  }
  static random() {
    return new Vec3({ x: Math.random(), y: Math.random(), z: Math.random() })
  }
  add(num: number) {
    return new Vec3({
      x: this.x + num,
      y: this.y + num,
      z: this.z + num,
    })
  }
  multiply(num: number) {
    return new Vec3({
      x: this.x * num,
      y: this.y * num,
      z: this.z * num,
    })
  }
  power(num: number) {
    return new Vec3({
      x: this.x ** num,
      y: this.y ** num,
      z: this.z ** num,
    })
  }
  plus(vec: Vec3) {
    return new Vec3({
      x: this.x + vec.x,
      y: this.y + vec.y,
      z: this.z + vec.z,
    })
  }
  minus(vec: Vec3) {
    return new Vec3({
      x: this.x - vec.x,
      y: this.y - vec.y,
      z: this.z - vec.z,
    })
  }
  dot(vec: Vec3) {
    return this.x * vec.x + this.y * vec.y + this.z * vec.z
  }
  cross(vec: Vec3) {
    return new Vec3({
      x: this.y * vec.z - this.z * vec.y,
      y: this.z * vec.x - this.x * vec.z,
      z: this.x * vec.y - this.y * vec.x,
    })
  }
  get unit() {
    return this.multiply(1 / this.length)
  }
  get lengthSquared() {
    return this.x ** 2 + this.y ** 2 + this.z ** 2
  }
  get length() {
    return Math.sqrt(this.lengthSquared)
  }
  get toColor(): Color {
    return [Math.round(this.x), Math.round(this.y), Math.round(this.z)]
  }
}

export const randomInUnitSphere = (): Vec3 => {
  while (true) {
    const p = Vec3.random()
    if (p.length < 1) {
      return p
    }
  }
}
