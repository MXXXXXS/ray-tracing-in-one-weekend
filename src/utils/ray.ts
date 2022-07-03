import { HittableList } from './hittable'
import { Color } from './ppmImg'
import { randomInUnitSphere, Vec3 } from './vec3'

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

export function rayColor(ray: Ray, world: HittableList, depth = 8): Vec3 {
  if (depth <= 0) return new Vec3({ x: 0, y: 0, z: 0 })
  // 世界
  const rec = world.hit({ ray, tMin: 0, tMax: Infinity })
  if (rec) {
    // 漫反射光线
    const target = rec.p.plus(rec.normal).plus(randomInUnitSphere())
    return rayColor(
      new Ray({ origin: rec.p, direction: target.minus(rec.p) }),
      world,
      depth - 1
    ).multiply(0.5)
  }
  // 背景
  const unitRayDirection = ray.direction.unit
  const t = 0.5 * (unitRayDirection.y + 1)
  const white = new Vec3({ x: 1, y: 1, z: 1 })
  const lightBlue = new Vec3({ x: 0.5, y: 0.7, z: 1 })
  return white.multiply(1 - t).plus(lightBlue.multiply(t))
}
