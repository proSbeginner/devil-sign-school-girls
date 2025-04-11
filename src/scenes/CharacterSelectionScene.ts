import { Container, Text, Ticker } from "pixi.js";
import { Girl1Character } from "../characters/Girl1Character";
import { Girl1CharacterSpriteLoader } from "../characters/Girl1CharacterSpriteLoader";
import { AbstractScene } from "./AbstractScene";

export class CharacterSelectionScene extends AbstractScene {
  private character = new Girl1Character(this.keyboard, new Girl1CharacterSpriteLoader())

  async loadSprites(): Promise<void> {
    this.addChild(this.createTitle())
    this.addChild(this.character)

    this.character.initialize()
  }

  onLoadedSprites(): void { }

  onUpdate(time: Ticker): void {
    this.character.update(time)
  }

  private createTitle(): Container {
    const text = new Text({
      text: 'Character Selection',
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
}