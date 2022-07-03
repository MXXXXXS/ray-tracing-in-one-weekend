import { Ray } from './ray'
import { Vec3 } from './vec3'

export class HitRecord {
  p: Vec3
  normal: Vec3
  t: number
  frontFace: boolean
  constructor(
    {
      p,
      normal,
      t,
      frontFace,
    }: {
      p: Vec3
      normal: Vec3
      t: number
      frontFace: boolean
    } = {
      p: new Vec3({ x: 0, y: 0, z: 0 }),
      normal: new Vec3({ x: 0, y: 0, z: 0 }),
      t: 0,
      frontFace: false,
    }
  ) {
    this.p = p
    this.normal = normal
    this.t = t
    this.frontFace = frontFace
  }
  setFaceNormal({ ray, outwardNormal }: { ray: Ray; outwardNormal: Vec3 }) {
    this.frontFace = ray.direction.dot(outwardNormal) < 0
    this.normal = this.frontFace
      ? outwardNormal.unit
      : outwardNormal.unit.multiply(-1)
  }
}

export abstract class Hittable {
  abstract hit({
    ray,
    tMin,
    tMax,
  }: {
    ray: Ray
    tMin: number
    tMax: number
  }): HitRecord | undefined
}

export class HittableList implements Hittable {
  objects: Hittable[] = []
  constructor(...hittableList: Hittable[]) {
    this.objects.push(...hittableList)
  }
  add(hittable: Hittable) {
    this.objects.push(hittable)
  }
  clear() {
    this.objects.splice(0, Infinity)
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
    let tempRec: HitRecord | undefined
    let closestSoFar = tMax // 由远及近地逐个找到最近的物体
    for (let index = 0; index < this.objects.length; index++) {
      const obj = this.objects[index]
      const rec = obj.hit({ ray, tMin, tMax: closestSoFar })
      if (rec) {
        closestSoFar = rec.t
        tempRec = rec
      }
    }
    return tempRec
  }
}
