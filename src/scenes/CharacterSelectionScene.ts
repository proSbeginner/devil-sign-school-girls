import { Assets, Container, Sprite, Text, Texture, Ticker } from "pixi.js";
import { Key } from "../utils/keyboard";
import { AbstractScene } from "./AbstractScene";
import { SceneName } from "./SceneName";

export class CharacterSelectionScene extends AbstractScene {
  // private girl1 = new Girl1Character(this.keyboard, new Girl1CharacterSpriteLoader())
  // private girl2 = new Girl2Character(this.keyboard, new Girl2CharacterSpriteLoader())
  // private girl3 = new Girl3Character(this.keyboard, new Girl3CharacterSpriteLoader())

  private characters = ['girl1', 'girl2', 'girl3']
  private selectedCharacterIndex = -1
  private selectedPlayerCharacter: string | null = null
  private selectedAiCharacter: string | null = null

  async loadSprites(): Promise<void> {
    this.addChild(this.createInstructionText())

    const girl1PromoteUrl = 'assets/Girl_1/Promote.jpeg'
    await Assets.load(girl1PromoteUrl)
    const girl1 = new Sprite(Texture.from(girl1PromoteUrl))
    girl1.x = 50
    girl1.y = 100
    girl1.width = 200
    girl1.height = 200
    girl1.label = 'girl1'
    this.addChild(girl1)

    const girl2PromoteUrl = 'assets/Girl_2/Promote.jpeg'
    await Assets.load(girl2PromoteUrl)
    const girl2 = new Sprite(Texture.from(girl2PromoteUrl))
    girl2.x = 300
    girl2.y = 100
    girl2.width = 200
    girl2.height = 200
    girl2.label = 'girl2'
    this.addChild(girl2)

    const girl3PromoteUrl = 'assets/Girl_3/Promote.jpeg'
    await Assets.load(girl3PromoteUrl)
    const girl3 = new Sprite(Texture.from(girl3PromoteUrl))
    girl3.x = 550
    girl3.y = 100
    girl3.width = 200
    girl3.height = 200
    girl3.label = 'girl3'
    this.addChild(girl3)

    this.updateSelectionHighlight()
  }

  onLoadedSprites(): void {
    this.keyboard.on('keydown', key => {
      if (key === Key.ArrowLeft) {
        this.selectedCharacterIndex = Math.max(0, this.selectedCharacterIndex - 1)
        this.updateSelectionHighlight()
      } else if (key === Key.ArrowRight) {
        this.selectedCharacterIndex = Math.min(this.characters.length - 1, this.selectedCharacterIndex + 1) // ปรับขอบเขต
        this.updateSelectionHighlight()
      } else if (key === Key.Space) {
        this.selectedPlayerCharacter = this.characters[this.selectedCharacterIndex]
        this.selectAiCharacter()
        this.goToBattleScene()
      }
    })
  }

  onUpdate(time: Ticker): void { }

  private createInstructionText(): Container {
    const text = new Text({
      text: 'Select your character',
      style: {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xffffff,
      }
    })
    text.x = window.innerWidth / 2
    text.y = 50
    text.anchor.set(0.5)

    return text
  }

  private updateSelectionHighlight(): void {
    const list = this.children.filter(child => this.characters.includes(child.label))
    list.forEach((item, index) => {
      if (index === this.selectedCharacterIndex) {
        item.tint = 0xff0000; // ไฮไลท์ตัวละครที่เลือก
      } else {
        item.tint = 0xffffff; // ไม่ไฮไลท์ตัวละครอื่น ๆ
      }
    })
  }

  private selectAiCharacter(): void {
    this.selectedAiCharacter = this.characters[Math.floor(Math.random() * this.characters.length)]
  }

  private goToBattleScene(): void {
    console.log(this.selectedPlayerCharacter)
    if (this.selectedPlayerCharacter && this.selectedAiCharacter) {
      // this.sceneManager.changeScene(SceneName.Battle, {
      //   playerCharacter: this.selectedPlayerCharacter,
      //   aiCharacter: this.selectedAiCharacter,
      // })
      // this.sceneManager.changeScene(SceneName.Battle)
    }
  }
}