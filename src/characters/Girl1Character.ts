import { Ticker } from "pixi.js";
import { Key } from "../utils/keyboard";
import { AbstractCharacter } from "./AbstractCharacter";
import { CharacterState } from "./CharacterState";

export class Girl1Character extends AbstractCharacter {
  private currentCharacterState: CharacterState = CharacterState.Idle
  private direction: number = 1
  private isMoving: boolean = false

  protected onLoadedSprites(): void {
    this.walk.visible = false
    this.addChild(this.walk)
    this.addChild(this.idle)
    this.setAnimateState(CharacterState.Idle)
  }

  protected setAnimateState(state: CharacterState): void {
    if (state === CharacterState.Walk && this.currentCharacterState !== CharacterState.Walk) { // ตรวจสอบ walk ถ้า walk อยู่แล้วก็ไม่ต้องทำอะไร
      this.walk.play()
      this.walk.visible = true

      this.idle.visible = false
      this.idle.stop()

      this.currentCharacterState = CharacterState.Walk
    } else if (state === CharacterState.Idle && this.currentCharacterState !== CharacterState.Idle) { // ตรวจสอบ idle ถ้า idle อยู่แล้วก็ไม่ต้องทำอะไร
      this.walk.stop()
      this.walk.visible = false

      this.idle.play()
      this.idle.visible = true

      this.currentCharacterState = CharacterState.Idle
    }
  }

  protected onUpdate(time: Ticker): void {
    if (this.keyboard.isKeyDown(Key.ArrowLeft) || this.keyboard.isKeyDown(Key.a)) {
      this.direction = -1
      this.walk.scale.x = this.direction
      this.setAnimateState(CharacterState.Walk)
      if (!this.isMoving) {
        this.isMoving = true
      }
    } else if (this.keyboard.isKeyDown(Key.ArrowRight) || this.keyboard.isKeyDown(Key.d)) {
      this.direction = 1
      this.walk.scale.x = this.direction
      this.setAnimateState(CharacterState.Walk)
      if (!this.isMoving) {
        this.isMoving = true
      }
    } else {
      this.setAnimateState(CharacterState.Idle)
      if (this.isMoving) {
        this.isMoving = false
      }
    }

    if (this.isMoving) {
      this.walk.x += 1.2 * time.deltaTime * this.direction
    }
    this.idle.x = this.walk.x
    this.idle.scale.x = this.direction
  }
}
