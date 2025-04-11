import { AnimatedSprite, Assets } from "pixi.js";
import { Character } from "./Character";
import { CharacterSpriteLoader } from "./CharacterSpriteLoader";

export class Girl3CharacterSpriteLoader implements CharacterSpriteLoader {
  async load(): Promise<Character> {
    await Assets.load('assets/girl_3_walk.json')
    await Assets.load('assets/girl_3_idle.json')

    const walkSprite = AnimatedSprite.fromFrames([
      "Girl3_Walk_000", "Girl3_Walk_001", "Girl3_Walk_002", "Girl3_Walk_003",
      "Girl3_Walk_004", "Girl3_Walk_005", "Girl3_Walk_006", "Girl3_Walk_007",
      "Girl3_Walk_008", "Girl3_Walk_009", "Girl3_Walk_010", "Girl3_Walk_011"
    ])
    walkSprite.animationSpeed = 0.3
    walkSprite.anchor.set(0.5, 0)

    const idleSprite = AnimatedSprite.fromFrames([
      "Girl3_Idle_000", "Girl3_Idle_001", "Girl3_Idle_002", "Girl3_Idle_003",
      "Girl3_Idle_004", "Girl3_Idle_005"
    ])
    idleSprite.animationSpeed = 0.03
    idleSprite.anchor.set(0.5, 0)

    return { walk: walkSprite, idle: idleSprite }
  }
}