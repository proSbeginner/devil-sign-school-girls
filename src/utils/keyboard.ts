import { EventEmitter } from "pixi.js"

export default class Keyboard extends EventEmitter {
  private keys: { [key: string]: { pressed: boolean } } = {}
  private keyDownHandler: (event: KeyboardEvent) => void
  private keyUpHandler: (event: KeyboardEvent) => void

  constructor() {
    super()
    this.keyDownHandler = this.handleKeyDown.bind(this)
    this.keyUpHandler = this.handleKeyUp.bind(this)

    window.addEventListener('keydown', this.keyDownHandler)
    window.addEventListener('keyup', this.keyUpHandler)
  }

  public destroy(): void {
    window.removeEventListener('keydown', this.keyDownHandler)
    window.removeEventListener('keyup', this.keyUpHandler)
  }

  public isKeyDown(key: string): boolean {
    return this.keys[key]?.pressed || false
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const key = event.code === 'Space' ? 'Space' : event.key
    if (!this.keys[key]) {
      this.keys[key] = { pressed: true }
    } else {
      this.keys[key].pressed = true
    }
    this.emit('keydown', key)
  }

  private handleKeyUp(event: KeyboardEvent): void {
    const key = event.code === 'Space' ? 'Space' : event.key
    if (this.keys[key]) {
      this.keys[key].pressed = false
    }
    this.emit('keyup', key)
  }
}

export enum Key {
  Space = "Space",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  a = "a",
  d = "d",
}