import { CharacterSprite } from "./Character";

export interface CharacterSpriteLoader {
  load(): Promise<CharacterSprite>
}