import { Camera } from './utils/camera'
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
const camera = new Camera({ aspectRatio })

// 渲染
const samplesPerPixel = 100

for (let hIndex = imgH - 1; hIndex >= 0; hIndex--) {
  for (let wIndex = 0; wIndex < imgW; wIndex++) {
    let color: Color = [0, 0, 0]
    for (let s = 0; s < samplesPerPixel; s++) {
      const u = (wIndex + Math.random()) / (imgW - 1)
      const v = (hIndex + Math.random()) / (imgH - 1)
      const ray = camera.getRay(u, v)
      const pixelColor = rayColor(ray, word)
      color = pixelColor.map((c, i) => c + color[i]) as Color
    }
    pixels.push(color.map((c) => Math.round(c / samplesPerPixel)) as Color)
  }
}

const img = new PpmImg({
  w: imgW,
  h: imgH,
  pixels,
})

img.writeImg('main.ppm')
