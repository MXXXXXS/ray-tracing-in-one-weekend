import { Color } from './ppmImg'
import { hitSphere } from './sphere'
import { Vec3 } from './vec3'

export class Ray {
  origin: Vec3
  direction: Vec3
  constructor({ origin, direction }: { origin: Vec3; direction: Vec3 }) {
    this.origin = origin
    this.direction = direction
  }
  at(t: number) {
    return this.origin.plus(this.direction.multiply(t))
  }
}

export function rayColor(ray: Ray): Color {
  // 球体
  let t = hitSphere(new Vec3({ x: 0, y: 0, z: -1 }), 0.5, ray)
  if (t > 0) {
    const N = ray.at(t).minus(new Vec3({ x: 0, y: 0, z: -1 })).unit
    return new Vec3({
      x: N.x + 1,
      y: N.y + 1,
      z: N.z + 1,
    }).multiply(0.5).toColor
  }

  // 背景
  const unitRayDirection = ray.direction.unit
  t = 0.5 * (unitRayDirection.y + 1)
  const white = new Vec3({ x: 1, y: 1, z: 1 })
  const lightBlue = new Vec3({ x: 0.5, y: 0.7, z: 1 })
  return white.multiply(1 - t).plus(lightBlue.multiply(t)).toColor
}
