import { Application, Ticker } from "pixi.js"
import { AbstractScene } from "./AbstractScene"
import { SceneName } from "./SceneName"

export class SceneManager {
  private scenes: { [key: string]: AbstractScene } = {}
  private currentScene: AbstractScene | null = null

  constructor(private app: Application) { }

  addScene(name: SceneName, scene: AbstractScene): void {
    if (this.scenes[name]) return

    this.scenes[name] = scene
    scene.visible = false
    this.app.stage.addChild(scene)
    scene.initialize()
  }

  changeScene(name: SceneName): void {
    if (this.currentScene) {
      this.currentScene.visible = false
    }
    const newScene = this.scenes[name]
    newScene.visible = true
    this.currentScene = newScene
  }

  update(time: Ticker): void {
    if (!this.currentScene) return
    this.currentScene.update(time)
  }
}