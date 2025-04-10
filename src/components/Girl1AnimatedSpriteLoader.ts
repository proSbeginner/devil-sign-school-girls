import { AnimatedSprite, Assets } from "pixi.js";
import { AnimatedSpriteLoader } from "./AnimatedSpriteLoader";

export class Girl1AnimatedSpriteLoader implements AnimatedSpriteLoader {
  async load(): Promise<{ walk: AnimatedSprite; idle: AnimatedSprite }> {
    await Assets.load('assets/girl_1_walk.json')
    await Assets.load('assets/girl_1_idle.json')

    const walkSprite = AnimatedSprite.fromFrames([
      "Walk_000", "Walk_001", "Walk_002", "Walk_003",
      "Walk_004", "Walk_005", "Walk_006", "Walk_007",
      "Walk_008", "Walk_009", "Walk_010", "Walk_011"
    ])
    walkSprite.animationSpeed = 0.3
    walkSprite.anchor.set(0.5, 0)

    const idleSprite = AnimatedSprite.fromFrames([
      "Idle_000", "Idle_001", "Idle_002", "Idle_003",
      "Idle_004", "Idle_005", "Idle_006", "Idle_007",
      "Idle_008"
    ])
    idleSprite.animationSpeed = 0.03
    idleSprite.anchor.set(0.5, 0)

    return { walk: walkSprite, idle: idleSprite };
  }
}