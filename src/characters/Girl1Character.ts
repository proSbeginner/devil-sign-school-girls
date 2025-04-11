import Keyboard from "../utils/keyboard";
import { AbstractCharacter } from "./AbstractCharacter";
import { CharacterSpriteLoader } from "./CharacterSpriteLoader";
import { CharacterState } from "./CharacterState";

export class Girl1Character extends AbstractCharacter {
  private currentCharacterState: CharacterState = CharacterState.Idle
  private direction: number = 1
  private isMoving: boolean = false

  constructor(
    keyboard: Keyboard,
    spriteLoader: CharacterSpriteLoader,
  ) {
    super(keyboard, spriteLoader)
  }

  onLoadedSprites(): void {
    this.sprites.walk.visible = false
    this.addChild(this.sprites.walk)
    this.addChild(this.sprites.idle)
    this.setAnimateState(CharacterState.Idle)
  }

  setAnimateState(state: CharacterState): void {
    if (state === CharacterState.Walk && this.currentCharacterState !== CharacterState.Walk) { // ตรวจสอบ walk ถ้า walk อยู่แล้วก็ไม่ต้องทำอะไร
      this.sprites.walk.play()
      this.sprites.walk.visible = true

      this.sprites.idle.visible = false
      this.sprites.idle.stop()

      this.currentCharacterState = CharacterState.Walk
    } else if (state === CharacterState.Idle && this.currentCharacterState !== CharacterState.Idle) { // ตรวจสอบ idle ถ้า idle อยู่แล้วก็ไม่ต้องทำอะไร
      this.sprites.walk.stop()
      this.sprites.walk.visible = false

      this.sprites.idle.play()
      this.sprites.idle.visible = true

      this.currentCharacterState = CharacterState.Idle
    }
  }

  onUpdate(deltaTime: number): void {
    if (this.keyboard.isKeyDown('ArrowLeft') || this.keyboard.isKeyDown('a')) {
      this.direction = -1
      this.sprites.walk.scale.x = this.direction
      this.setAnimateState(CharacterState.Walk)
      if (!this.isMoving) {
        this.isMoving = true
      }
    } else if (this.keyboard.isKeyDown('ArrowRight') || this.keyboard.isKeyDown('d')) {
      this.direction = 1
      this.sprites.walk.scale.x = this.direction
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
      this.sprites.walk.x += 1.2 * deltaTime * this.direction
    }
    this.sprites.idle.x = this.sprites.walk.x
    this.sprites.idle.scale.x = this.direction
  }
}
