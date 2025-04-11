import { Application } from 'pixi.js'
import { CharacterSelectionScene } from './scenes/CharacterSelectionScene'
import { MainMenuScene } from './scenes/MainMenuScene'
import { SceneManager } from './scenes/SceneManager'
import { SceneName } from './scenes/SceneName'
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
  const sceneManager = new SceneManager(app)
  const mainMenuScene = new MainMenuScene(keyboard, sceneManager, app)
  const characterSelectionScene = new CharacterSelectionScene(keyboard, sceneManager, app)

  sceneManager.addScene(SceneName.MainMenu, mainMenuScene)
  sceneManager.addScene(SceneName.CharacterSelection, characterSelectionScene)
  sceneManager.changeScene(SceneName.MainMenu)

  app.ticker.add((time) => {
    sceneManager.update(time)
  })

  // เมื่อเลิกใช้งาน (เช่น เปลี่ยนหน้า) ให้เรียก destroy()
  window.addEventListener('beforeunload', () => {
    keyboard.destroy()
  })
})()
