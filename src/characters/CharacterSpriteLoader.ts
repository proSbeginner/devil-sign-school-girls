import { Character } from "./Character";

export interface CharacterSpriteLoader {
  load(): Promise<Character>
}