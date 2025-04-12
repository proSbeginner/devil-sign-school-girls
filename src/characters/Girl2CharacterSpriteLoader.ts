import { AnimatedSprite, Assets } from "pixi.js";
import { CharacterSprite } from "./Character";
import { CharacterSpriteLoader } from "./CharacterSpriteLoader";

export class Girl2CharacterSpriteLoader implements CharacterSpriteLoader {
  async load(): Promise<CharacterSprite> {
    await Assets.load('assets/girl_2_walk.json')
    await Assets.load('assets/girl_2_idle.json')

    const walkSprite = AnimatedSprite.fromFrames([
      "Girl2_Walk_000", "Girl2_Walk_001", "Girl2_Walk_002", "Girl2_Walk_003",
      "Girl2_Walk_004", "Girl2_Walk_005", "Girl2_Walk_006", "Girl2_Walk_007",
      "Girl2_Walk_008", "Girl2_Walk_009", "Girl2_Walk_010", "Girl2_Walk_011"
    ])
    walkSprite.animationSpeed = 0.3
    walkSprite.anchor.set(0.5, 0)

    const idleSprite = AnimatedSprite.fromFrames([
      "Girl2_Idle_000", "Girl2_Idle_001", "Girl2_Idle_002", "Girl2_Idle_003",
      "Girl2_Idle_004", "Girl2_Idle_005", "Girl2_Idle_006"
    ])
    idleSprite.animationSpeed = 0.03
    idleSprite.anchor.set(0.5, 0)

    return { walk: walkSprite, idle: idleSprite }
  }


}