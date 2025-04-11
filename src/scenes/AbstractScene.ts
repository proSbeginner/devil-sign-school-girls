import { Application, Container, Ticker } from "pixi.js";
import Keyboard from "../utils/keyboard";
import { SceneManager } from "./SceneManager";

export abstract class AbstractScene extends Container {
  protected isLoadedSprites = false

  constructor(
    protected keyboard: Keyboard,
    protected sceneManager: SceneManager,
    protected app: Application
  ) { super() }

  /**
   * [บังคับ] จะต้องถูกเรียกหลังจาก new คลาสลูกของ AbstractScene
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
  abstract loadSprites(): Promise<void>

  /**
 * ออกแบบให้ถูก override ได้ในคลาสลูก
 * เพื่อ initialize ค่าที่จำเป็นอื่นๆก่อนเรียก update
 */
  abstract onLoadedSprites(): void

  /**
   * ออกแบบให้ถูก override ได้ในคลาสลูก
   * [บังคับ] จะต้องถูกเรียกใน runtime ของเกมเสมอ
   */
  update(time: Ticker): void {
    if (!this.isLoadedSprites) return
    this.onUpdate(time)
  }

  abstract onUpdate(time: Ticker): void
}