import { Ray } from './ray'
import { Vec3 } from './vec3'

export class Camera {
  cameraOrigin: Vec3
  horizontal: Vec3
  vertical: Vec3
  lowerLeftCorner: Vec3

  constructor({ aspectRatio = 16 / 9 }) {
    const vw = 2
    const vh = vw / aspectRatio
    const focalLen = 1

    this.cameraOrigin = new Vec3({ x: 0, y: 0, z: 0 })
    this.horizontal = new Vec3({ x: vw, y: 0, z: 0 })
    this.vertical = new Vec3({ x: 0, y: vh, z: 0 })
    this.lowerLeftCorner = this.cameraOrigin
      .minus(this.horizontal.multiply(1 / 2))
      .minus(this.vertical.multiply(1 / 2))
      .minus(new Vec3({ x: 0, y: 0, z: focalLen }))
  }

  getRay(u: number, v: number) {
    return new Ray({
      origin: this.cameraOrigin,
      direction: this.lowerLeftCorner.plus(
        this.horizontal
          .multiply(u)
          .plus(this.vertical.multiply(v).minus(this.cameraOrigin))
      ),
    })
  }
}
