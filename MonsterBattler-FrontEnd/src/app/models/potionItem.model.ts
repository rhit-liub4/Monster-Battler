import { GameItem } from "./item.model";

export interface PotionItem extends GameItem {
  restoreAmount: number;
}
