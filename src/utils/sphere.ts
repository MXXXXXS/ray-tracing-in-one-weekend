import { Hittable, HitRecord } from './hittable'
import { Ray } from './ray'
import { Vec3 } from './vec3'

export class Sphere implements Hittable {
  center: Vec3
  radius: number
  constructor({ center, radius }: { center: Vec3; radius: number }) {
    this.center = center
    this.radius = radius
  }
  hit({
    ray,
    tMin,
    tMax,
  }: {
    ray: Ray
    tMin: number
    tMax: number
  }): HitRecord | undefined {
    const oc = ray.origin.minus(this.center)
    const a = ray.direction.lengthSquared
    const halfB = oc.dot(ray.direction)
    const c = oc.lengthSquared - this.radius ** 2
    const discriminant = halfB ** 2 - a * c
    if (discriminant <= 0) return
    // Find the nearest root that lies in the acceptable range.
    const sqrtD = Math.sqrt(discriminant)
    let root = (-halfB - sqrtD) / a
    if (root < tMin || tMax < root) {
      root = (-halfB + sqrtD) / a
      if (root < tMin || tMax < root) {
        return
      }
    }
    const rec = new HitRecord()
    rec.t = root
    rec.p = ray.at(rec.t)
    const outwardNormal = rec.p.minus(this.center).multiply(1 / this.radius)
    rec.setFaceNormal({ ray, outwardNormal })
    return rec
  }
}
