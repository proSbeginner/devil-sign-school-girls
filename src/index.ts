import { Application } from 'pixi.js'
import { Girl1AnimatedSpriteLoader } from './components/Girl1AnimatedSpriteLoader'
import Keyboard from './utils/keyboard'
import { Character } from './components/Character'

(async () => {
  const appConfig = {
    background: 0x1099bb,
    resizeTo: window,
  }
  const app = new Application()
  await app.init(appConfig)
  document.body.appendChild(app.canvas)

  const keyboard = new Keyboard()
  const spriteLoader = new Girl1AnimatedSpriteLoader()
  const character = new Character(keyboard, spriteLoader)

  app.ticker.add((time) => {
    character.update(time.deltaTime)
  })

  // เมื่อเลิกใช้งาน (เช่น เปลี่ยนหน้า) ให้เรียก destroy()
  window.addEventListener('beforeunload', () => {
    keyboard.destroy();
  });
})()
