import { Camera } from './utils/camera'
import { HittableList } from './utils/hittable'
import { Color, PpmImg } from './utils/ppmImg'
import { Ray, rayColor } from './utils/ray'
import { Sphere } from './utils/sphere'
import { Vec3 } from './utils/vec3'

// 输出图像
const aspectRatio = 16 / 9
const imgW = 1280
const imgH = imgW / aspectRatio
const pixels: Color[] = []

// 世界
const word = new HittableList()
word.add(
  new Sphere({ center: new Vec3({ x: -0.5, y: 0, z: -3 }), radius: 0.5 })
)
word.add(new Sphere({ center: new Vec3({ x: 0.5, y: 1, z: -3 }), radius: 1 }))
word.add(
  new Sphere({ center: new Vec3({ x: 0, y: -101, z: -10 }), radius: 100 })
)

// 相机
const camera = new Camera({ aspectRatio })

// 渲染
const samplesPerPixel = 60
const maxDepth = 50

for (let hIndex = imgH - 1; hIndex >= 0; hIndex--) {
  for (let wIndex = 0; wIndex < imgW; wIndex++) {
    let color = new Vec3({ x: 0, y: 0, z: 0 })
    for (let s = 0; s < samplesPerPixel; s++) {
      const u = (wIndex + Math.random()) / (imgW - 1)
      const v = (hIndex + Math.random()) / (imgH - 1)
      const ray = camera.getRay(u, v)
      const pixelColor = rayColor(ray, word, maxDepth)
      color = pixelColor.plus(color)
    }
    pixels.push(
      color
        .multiply(1 / samplesPerPixel)
        .power(0.5)
        .multiply(255).toColor
    )
  }
  process.stdout.clearLine(0)
  process.stdout.cursorTo(0)
  process.stdout.write(
    `Rendering ${Math.round(((imgH - hIndex - 1) / imgH) * 100)} %`
  )
}
process.stdout.write('\n')

const img = new PpmImg({
  w: imgW,
  h: imgH,
  pixels,
})

img.writeImg('main.ppm')
