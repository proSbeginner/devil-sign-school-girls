import { AnimatedSprite } from "pixi.js";

export interface AnimatedSpriteLoader {
  load(): Promise<{
    walk: AnimatedSprite
    idle: AnimatedSprite
  }>
}