import { AnimatedSprite, Application, Assets } from 'pixi.js'

(async () => {
  const appConfig = {
    // width: window.innerWidth,
    // height: window.innerHeight,
    background: 0x1099bb,
    resizeTo: window,
    // resolution: window.devicePixelRatio || 1,
    // autoDensity: true,
  }
  const app = new Application()
  await app.init(appConfig)
  document.body.appendChild(app.canvas)

  const texture = await Assets.load('assets/girl_1_walk.json')
  const walkingSprite = AnimatedSprite.fromFrames([
    "Walk_000", "Walk_001", "Walk_002", "Walk_003",
    "Walk_004", "Walk_005", "Walk_006", "Walk_007",
    "Walk_008", "Walk_009", "Walk_010", "Walk_011"
  ])
  walkingSprite.animationSpeed = 0.3
  walkingSprite.play()
  app.stage.addChild(walkingSprite)

  let direction = 1; // ให้ตัวละครเดินไปทางขวา
  app.ticker.add((time) => {
    walkingSprite.x += 1.2 * time.deltaTime * direction;

    // ตรวจสอบขอบจอและเปลี่ยนทิศทาง
    if (walkingSprite.x > app.screen.width - 50) {
      direction = -1;
      walkingSprite.scale.x = -1;
    } else if (walkingSprite.x < 50) {
      direction = 1;
      walkingSprite.scale.x = 1;
    }
  })
})()
