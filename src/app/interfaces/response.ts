import { Character } from "./character";
import { Info } from "./info";

export interface Response {
    info: Info,
    results: Character[]
}
