import { AnimatedSprite, Application, Assets } from 'pixi.js'
import Keyboard from './utils/keyboard'
import { EnumType } from 'typescript'

(async () => {
  const appConfig = {
    background: 0x1099bb,
    resizeTo: window,
  }
  const app = new Application()
  await app.init(appConfig)
  document.body.appendChild(app.canvas)

  const keyboard = new Keyboard()
  enum AnimateState {
    Walk, Idle
  }

  await Assets.load('assets/girl_1_walk.json')
  await Assets.load('assets/girl_1_idle.json')
  const walkSprite = AnimatedSprite.fromFrames([
    "Walk_000", "Walk_001", "Walk_002", "Walk_003",
    "Walk_004", "Walk_005", "Walk_006", "Walk_007",
    "Walk_008", "Walk_009", "Walk_010", "Walk_011"
  ])
  walkSprite.animationSpeed = 0.3
  walkSprite.anchor.set(0.5, 0) // เคลื่อนจุดกึ่งกลางเฉพาะแกน x แกน y ให้เป็นค่าปกติ
  walkSprite.x = 0 // ตำแหน่งของภาพบนแกน x
  walkSprite.y = 0 // ตำแหน่งของภาพบนแกน y
  walkSprite.width = 128 // ไม่ต้องกำหนดก็ได้ แต่ก็อยากกำหนดให้ชัดเจน
  walkSprite.height = 128 // ไม่ต้องกำหนดก็ได้ แต่ก็อยากกำหนดให้ชัดเจน
  walkSprite.visible = false
  app.stage.addChild(walkSprite)

  const idleSprite = AnimatedSprite.fromFrames([
    "Idle_000", "Idle_001", "Idle_002", "Idle_003",
    "Idle_004", "Idle_005", "Idle_006", "Idle_007",
    "Idle_008"
  ])
  idleSprite.animationSpeed = 0.03
  idleSprite.anchor.set(0.5, 0)
  idleSprite.visible = true
  app.stage.addChild(idleSprite)

  let direction = 1 // 1 ทำให้ walk ไปทางขวา, -1 ทำให้ walk ไปทางซ้าย
  let isMoving = false
  let currentAnimateState = AnimateState.Idle // ให้เป็น idle by default

  function setAnimateState(state: AnimateState): void {
    if(state === AnimateState.Walk && currentAnimateState !== AnimateState.Walk) { // ตรวจสอบ walk ถ้า walk อยู่แล้วก็ไม่ต้องทำอะไร
      walkSprite.play()
      walkSprite.visible = true

      idleSprite.visible = false
      idleSprite.stop()

      currentAnimateState = AnimateState.Walk
    } else if(state === AnimateState.Idle && currentAnimateState !== AnimateState.Idle) { // ตรวจสอบ idle ถ้า idle อยู่แล้วก็ไม่ต้องทำอะไร
      walkSprite.stop()
      walkSprite.visible = false
      
      idleSprite.play()
      idleSprite.visible = true

      currentAnimateState = AnimateState.Idle
    }
  }


  app.ticker.add((time) => {
    if (keyboard.isKeyDown('ArrowLeft') || keyboard.isKeyDown('a')) {
      direction = -1
      walkSprite.scale.x = direction
      setAnimateState(AnimateState.Walk)
      if (!isMoving) {
        isMoving = true
      }
    } else if (keyboard.isKeyDown('ArrowRight') || keyboard.isKeyDown('d')) {
      direction = 1
      walkSprite.scale.x = direction
      setAnimateState(AnimateState.Walk)
      if (!isMoving) {
        isMoving = true
      }
    } else {
      setAnimateState(AnimateState.Idle)
      if (isMoving) {
        isMoving = false;
      }
    }

    if(isMoving) {
      walkSprite.x += 1.2 * time.deltaTime * direction
    }
    idleSprite.x = walkSprite.x
    idleSprite.scale.x = direction
    
    // เมื่อเลิกใช้งาน (เช่น เปลี่ยนหน้า) ให้เรียก destroy()
    window.addEventListener('beforeunload', () => {
      keyboard.destroy();
    });
  })
})()
