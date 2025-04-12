import { AnimatedSprite } from "pixi.js"

export interface Character {
  readonly walk: AnimatedSprite
  readonly idle: AnimatedSprite
}

export interface CharacterSprite {
  readonly walk: AnimatedSprite
  readonly idle: AnimatedSprite
}