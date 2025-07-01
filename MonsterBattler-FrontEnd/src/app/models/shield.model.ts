import { GameItem } from "./item.model";

export interface ShieldItem extends GameItem {
    blockBonus: number;
}
