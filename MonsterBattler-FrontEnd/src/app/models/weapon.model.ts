import { GameItem } from "./item.model";

export interface WeaponItem extends GameItem {
  atkBonus: number;
}
