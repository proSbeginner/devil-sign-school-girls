import { AnimatedSprite, Container, Ticker, Triangle } from "pixi.js";
import { AnimatedSpriteLoader } from "./AnimatedSpriteLoader";
import { AnimatedState } from "./AnimatedState";
import Keyboard from "../utils/keyboard";

export abstract class AbstractCharacter extends Container {
  protected sprites!: {
    walk: AnimatedSprite
    idle: AnimatedSprite
  }
  protected isLoadedSprites = false

  constructor(
    protected keyboard: Keyboard,
    private spriteLoader: AnimatedSpriteLoader,
  ) { super() }

  /**
   * [บังคับ] จะต้องถูกเรียกหลังจาก new คลาสลูกของ AbstractCharacter
   */
  async initialize(): Promise<void> {
    const loaded = this.loadSprites()
    loaded.then(() => {
      this.onLoadedSprites()
    })
  }

  /**
   * ออกแบบให้ถูกเรียกโดย initialize
   * เพื่อโหลดทุก sprites
   */
  async loadSprites(): Promise<void> {
    const sprites = await this.spriteLoader.load()
    this.isLoadedSprites = true

    this.sprites = {
      walk: sprites.walk,
      idle: sprites.idle,
    }
  }

  /**
   * ออกแบบให้ถูก override ได้ในคลาสลูก
   * เพื่อ initialize ค่าที่จำเป็นอื่นๆก่อนเรียก update
   */
  abstract onLoadedSprites(): void

  /**
   * ออกแบบให้ถูก override ได้ในคลาสลูก
   * เพื่อกำหนด sprite animation ควบคู่กับ Keyboard
   */
  abstract setAnimateState(state: AnimatedState): void

  /**
   * ออกแบบให้ถูก override ได้ในคลาสลูก
   * [บังคับ] จะต้องถูกเรียกใน runtime ของเกมเสมอ
   */
  update(time: Ticker): void {
    if (!this.isLoadedSprites) return
    this.onUpdate(time.deltaTime)
  }

  abstract onUpdate(deltaTime: number): void
}