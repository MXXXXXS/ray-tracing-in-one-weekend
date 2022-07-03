import { HittableList } from './utils/hittable'
import { Color, PpmImg } from './utils/ppmImg'
import { Ray, rayColor } from './utils/ray'
import { Sphere } from './utils/sphere'
import { Vec3 } from './utils/vec3'

// 输出图像
const aspectRatio = 16 / 9
const imgW = 400
const imgH = 400 / aspectRatio
const pixels: Color[] = []

// 世界
const word = new HittableList()
word.add(
  new Sphere({ center: new Vec3({ x: -0.5, y: 0, z: -3 }), radius: 0.5 })
)
word.add(new Sphere({ center: new Vec3({ x: 0.5, y: -1, z: -3 }), radius: 1 }))

// 相机
const vw = 2
const vh = vw / aspectRatio
const focalLen = 1

const cameraOrigin = new Vec3({ x: 0, y: 0, z: 0 })
const horizontal = new Vec3({ x: vw, y: 0, z: 0 })
const vertical = new Vec3({ x: 0, y: vh, z: 0 })
const lowerLeftCorner = cameraOrigin
  .minus(horizontal.multiply(1 / 2))
  .minus(vertical.multiply(1 / 2))
  .minus(new Vec3({ x: 0, y: 0, z: focalLen }))

// 渲染

for (let hIndex = imgH - 1; hIndex >= 0; hIndex--) {
  for (let wIndex = 0; wIndex < imgW; wIndex++) {
    const u = wIndex / (imgW - 1)
    const v = hIndex / (imgH - 1)
    const ray = new Ray({
      origin: cameraOrigin,
      direction: lowerLeftCorner.plus(
        horizontal.multiply(u).plus(vertical.multiply(v).minus(cameraOrigin))
      ),
    })
    const pixelColor = rayColor(ray, word)
    pixels.push(pixelColor)
  }
}

const img = new PpmImg({
  w: imgW,
  h: imgH,
  pixels,
})

img.writeImg('main.ppm')
