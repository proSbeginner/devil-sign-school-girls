import { Application } from 'pixi.js'
import { Girl1AnimatedSpriteLoader } from './components/Girl1AnimatedSpriteLoader'
import { Girl1Character } from './components/Girl1Character'
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
  const character = new Girl1Character(keyboard, new Girl1AnimatedSpriteLoader())
  character.initialize()

  app.stage.addChild(character)
  
  app.ticker.add((time) => {
    character.update(time)
  })

  // เมื่อเลิกใช้งาน (เช่น เปลี่ยนหน้า) ให้เรียก destroy()
  window.addEventListener('beforeunload', () => {
    keyboard.destroy()
  })
})()
