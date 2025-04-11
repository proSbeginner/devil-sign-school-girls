import { Container, Text, Ticker } from "pixi.js";
import { Key } from "../utils/keyboard";
import { AbstractScene } from "./AbstractScene";
import { SceneName } from "./SceneName";

export class MainMenuScene extends AbstractScene {
  async loadSprites(): Promise<void> {
    this.addChild(this.createTitle())
    this.addChild(this.createStartText())
  }

  onLoadedSprites(): void {
    this.keyboard.on('keydown', (key: string) => {
      if (key === Key.Space) {
        this.sceneManager.changeScene(SceneName.CharacterSelection)
      }
    })
  }

  onUpdate(time: Ticker): void { }

  private createTitle(): Container {
    const text = new Text({
      text: 'Girl Fighter',
      style: {
        fontFamily: 'Arial',
        fontSize: 48,
        fill: 0xffffff,
        stroke: 0x000000,
      }
    })
    text.anchor.set(0.5)
    text.x = window.innerWidth / 2
    text.y = window.innerHeight / 4

    return text
  }

  private createStartText(): Container {
    const text = new Text({
      text: 'Press Space to Start',
      style: {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xffffff,
        stroke: 0x000000,
      }
    })
    text.anchor.set(0.5)
    text.x = window.innerWidth / 2
    text.y = window.innerHeight / 2

    return text
  }
}