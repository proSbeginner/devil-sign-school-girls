import { AnimatedSprite, Assets } from "pixi.js";
import { Character } from "./Character";
import { CharacterSpriteLoader } from "./CharacterSpriteLoader";

export class Girl1CharacterSpriteLoader implements CharacterSpriteLoader {
  async load(): Promise<Character> {
    await Assets.load('assets/girl_1_walk.json')
    await Assets.load('assets/girl_1_idle.json')

    const walkSprite = AnimatedSprite.fromFrames([
      "Girl1_Walk_000", "Girl1_Walk_001", "Girl1_Walk_002", "Girl1_Walk_003",
      "Girl1_Walk_004", "Girl1_Walk_005", "Girl1_Walk_006", "Girl1_Walk_007",
      "Girl1_Walk_008", "Girl1_Walk_009", "Girl1_Walk_010", "Girl1_Walk_011"
    ])
    walkSprite.animationSpeed = 0.3
    walkSprite.anchor.set(0.5, 0)

    const idleSprite = AnimatedSprite.fromFrames([
      "Girl1_Idle_000", "Girl1_Idle_001", "Girl1_Idle_002", "Girl1_Idle_003",
      "Girl1_Idle_004", "Girl1_Idle_005", "Girl1_Idle_006", "Girl1_Idle_007",
      "Girl1_Idle_008"
    ])
    idleSprite.animationSpeed = 0.03
    idleSprite.anchor.set(0.5, 0)

    return { walk: walkSprite, idle: idleSprite }
  }
}