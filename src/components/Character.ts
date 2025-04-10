import { AnimatedSprite, Container } from "pixi.js";
import Keyboard from "../utils/keyboard";
import { AnimatedSpriteLoader } from "./AnimatedSpriteLoader";
import { AnimatedState } from "./AnimatedState";

export class Character extends Container {
  private walkSprite!: AnimatedSprite
  private idleSprite!: AnimatedSprite
  private currentAnimatedState: AnimatedState = AnimatedState.Idle
  private direction: number = 1
  private isMoving: boolean = false
  private isLoadedSprites = false

  constructor(
    private keyboard: Keyboard,
    spriteLoader: AnimatedSpriteLoader) {
    super()
    spriteLoader.load().then((sprites) => {
      this.walkSprite = sprites.walk
      this.idleSprite = sprites.idle
      this.initialize()
      this.isLoadedSprites = true
    })
  }

  private initialize() {
    this.walkSprite.visible = false
    this.addChild(this.walkSprite)
    this.addChild(this.idleSprite)
    this.setAnimateState(AnimatedState.Idle)
  }

  private setAnimateState(state: AnimatedState): void {
    if (state === AnimatedState.Walk && this.currentAnimatedState !== AnimatedState.Walk) { // ตรวจสอบ walk ถ้า walk อยู่แล้วก็ไม่ต้องทำอะไร
      this.walkSprite.play()
      this.walkSprite.visible = true

      this.idleSprite.visible = false
      this.idleSprite.stop()

      this.currentAnimatedState = AnimatedState.Walk
    } else if (state === AnimatedState.Idle && this.currentAnimatedState !== AnimatedState.Idle) { // ตรวจสอบ idle ถ้า idle อยู่แล้วก็ไม่ต้องทำอะไร
      this.walkSprite.stop()
      this.walkSprite.visible = false

      this.idleSprite.play()
      this.idleSprite.visible = true

      this.currentAnimatedState = AnimatedState.Idle
    }
  }

  public update(deltaTime: number): void {
    if(!this.isLoadedSprites) return

    if (this.keyboard.isKeyDown('ArrowLeft') || this.keyboard.isKeyDown('a')) {
      this.direction = -1
      this.walkSprite.scale.x = this.direction
      this.setAnimateState(AnimatedState.Walk)
      if (!this.isMoving) {
        this.isMoving = true
      }
    } else if (this.keyboard.isKeyDown('ArrowRight') || this.keyboard.isKeyDown('d')) {
      this.direction = 1
      this.walkSprite.scale.x = this.direction
      this.setAnimateState(AnimatedState.Walk)
      if (!this.isMoving) {
        this.isMoving = true
      }
    } else {
      this.setAnimateState(AnimatedState.Idle)
      if (this.isMoving) {
        this.isMoving = false
      }
    }

    if (this.isMoving) {
      this.walkSprite.x += 1.2 * deltaTime * this.direction
    }
    this.idleSprite.x = this.walkSprite.x
    this.idleSprite.scale.x = this.direction
  }
}
