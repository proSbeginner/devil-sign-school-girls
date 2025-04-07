import { AnimatedSprite, Application, Assets } from 'pixi.js'
import Keyboard from './utils/keyboard'

(async () => {
  const appConfig = {
    background: 0x1099bb,
    resizeTo: window,
  }
  const app = new Application()
  await app.init(appConfig)
  document.body.appendChild(app.canvas)

  const keyboard = new Keyboard()

  await Assets.load('assets/girl_1_walk.json')
  const walkingSprite = AnimatedSprite.fromFrames([
    "Walk_000", "Walk_001", "Walk_002", "Walk_003",
    "Walk_004", "Walk_005", "Walk_006", "Walk_007",
    "Walk_008", "Walk_009", "Walk_010", "Walk_011"
  ])
  walkingSprite.animationSpeed = 0.3
  walkingSprite.anchor.set(0.5, 0) // เคลื่อนจุดกึ่งกลางเฉพาะแกน x แกน y ให้เป็นค่าปกติ
  walkingSprite.x = 50 // ตำแหน่งของภาพบนแกน x
  walkingSprite.y = 0 // ตำแหน่งของภาพบนแกน y
  walkingSprite.width = 128 // ไม่ต้องกำหนดก็ได้ แต่ก็อยากกำหนดให้ชัดเจน
  walkingSprite.height = 128 // ไม่ต้องกำหนดก็ได้ แต่ก็อยากกำหนดให้ชัดเจน
  app.stage.addChild(walkingSprite)

  let direction = 0
  let isMoving = false

  app.ticker.add((time) => {
    if (keyboard.isKeyDown('ArrowLeft') || keyboard.isKeyDown('a')) {
      direction = -1
      walkingSprite.scale.x = direction
      if (!isMoving) {
        walkingSprite.play()
        isMoving = true
      }
    } else if (keyboard.isKeyDown('ArrowRight') || keyboard.isKeyDown('d')) {
      direction = 1
      walkingSprite.scale.x = direction
      if (!isMoving) {
        walkingSprite.play()
        isMoving = true
      }
    } else {
      direction = 0
      if (isMoving) {
        walkingSprite.stop();
        isMoving = false;
      }
    }

    walkingSprite.x += 1.2 * time.deltaTime * direction;

    // เมื่อเลิกใช้งาน (เช่น เปลี่ยนหน้า) ให้เรียก destroy()
    window.addEventListener('beforeunload', () => {
      keyboard.destroy();
    });
  })
})()
