import { Color } from './ppmImg'
import { Vec3 } from './vec3'

export class Ray {
  origin: Vec3
  direction: Vec3
  constructor({ origin, direction }: { origin: Vec3; direction: Vec3 }) {
    this.origin = origin
    this.direction = direction
  }
  at(t: number) {
    return this.origin.plus(this.direction.add(t))
  }
}

export function rayColor(ray: Ray): Color {
  const unitRayDirection = ray.direction.unit
  const t = 0.5 * (unitRayDirection.y + 1)
  const white = new Vec3({ x: 1, y: 1, z: 1 })
  const lightBlue = new Vec3({ x: 0.5, y: 0.7, z: 1 })
  return white.multiply(1 - t).plus(lightBlue.multiply(t)).toColor
}