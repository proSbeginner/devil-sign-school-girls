import { Container, Text, Ticker } from "pixi.js";
import { Girl1Character } from "../characters/Girl1Character";
import { Girl1CharacterSpriteLoader } from "../characters/Girl1CharacterSpriteLoader";
import { Girl2Character } from "../characters/Girl2Character";
import { Girl2CharacterSpriteLoader } from "../characters/Girl2CharacterSpriteLoader";
import { Girl3Character } from "../characters/Girl3Character";
import { Girl3CharacterSpriteLoader } from "../characters/Girl3CharacterSpriteLoader";
import { AbstractScene } from "./AbstractScene";

export class CharacterSelectionScene extends AbstractScene {
  private girl1 = new Girl1Character(this.keyboard, new Girl1CharacterSpriteLoader())
  private girl2 = new Girl2Character(this.keyboard, new Girl2CharacterSpriteLoader())
  private girl3 = new Girl3Character(this.keyboard, new Girl3CharacterSpriteLoader())

  async loadSprites(): Promise<void> {
    this.addChild(this.createTitle())
    this.addChild(this.girl1)
    this.addChild(this.girl2)
    this.addChild(this.girl3)

    this.girl1.initialize()
    this.girl2.initialize()
    this.girl3.initialize()
  }

  onLoadedSprites(): void {
  }

  onUpdate(time: Ticker): void {
    this.girl3.update(time)
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