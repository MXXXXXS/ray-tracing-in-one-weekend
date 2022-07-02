import { Ray } from './ray'
import { Vec3 } from './vec3'

export const hitSphere = (center: Vec3, radius: number, ray: Ray): boolean => {
  const oc = ray.origin.minus(center)
  const a = ray.direction.dot(ray.direction)
  const b = 2 * oc.dot(ray.direction)
  const c = oc.dot(oc) - radius ** 2
  const discriminant = b ** 2 - 4 * a * c
  return discriminant > 0
}
