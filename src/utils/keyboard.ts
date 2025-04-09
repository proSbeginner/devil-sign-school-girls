export default class Keyboard {
  private keys: { [key: string]: { pressed: boolean; } } = {}
  private keyDownHandler: (event: KeyboardEvent) => void
  private keyUpHandler: (event: KeyboardEvent) => void

  constructor() {
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
    return this.keys[key]?.pressed || false;
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (!this.keys[key]) {
      this.keys[key] = { pressed: true }
    } else {
      this.keys[key].pressed = true
    }
  }

  private handleKeyUp(event: KeyboardEvent): void {
    const key = event.key;
    if (this.keys[key]) {
      this.keys[key].pressed = false
    }
  }
}