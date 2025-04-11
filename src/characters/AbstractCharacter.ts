import { Container, Ticker } from "pixi.js";
import Keyboard from "../utils/keyboard";
import { Character } from "./Character";
import { CharacterSpriteLoader } from "./CharacterSpriteLoader";
import { CharacterState } from "./CharacterState";

export abstract class AbstractCharacter extends Container {
  protected sprites!: Character
  protected isLoadedSprites = false

  constructor(
    protected keyboard: Keyboard,
    private spriteLoader: CharacterSpriteLoader,
  ) { super() }

  /**
   * [บังคับ] จะต้องถูกเรียกหลังจาก new คลาสลูกของ AbstractCharacter
   */
  async initialize(): Promise<void> {
    const loaded = this.loadSprites()
    loaded.then(() => {
      this.isLoadedSprites = true
      this.onLoadedSprites()
    })
  }

  /**
   * ออกแบบให้ถูกเรียกโดย initialize
   * เพื่อโหลดทุก sprites
   */
  protected async loadSprites(): Promise<void> {
    const sprites = await this.spriteLoader.load()
    this.sprites = {
      walk: sprites.walk,
      idle: sprites.idle,
    }
  }

  /**
   * ออกแบบให้ถูก override ได้ในคลาสลูก
   * เพื่อ initialize ค่าที่จำเป็นอื่นๆก่อนเรียก update
   */
  protected abstract onLoadedSprites(): void

  /**
   * ออกแบบให้ถูก override ได้ในคลาสลูก
   * เพื่อกำหนด sprite animation ควบคู่กับ Keyboard
   */
  protected abstract setAnimateState(state: CharacterState): void

  /**
   * ออกแบบให้ถูก override ได้ในคลาสลูก
   * [บังคับ] จะต้องถูกเรียกใน runtime ของเกมเสมอ
   */
  update(time: Ticker): void {
    if (!this.isLoadedSprites) return
    this.onUpdate(time)
  }

  protected abstract onUpdate(time: Ticker): void
}