import { GameItem } from "./item.model";

export interface Hero {
    heroName: string;
    heroTokens: number;
    heroMaxHealth: number;
    heroHealth: number;
    heroItems: string;
    heroLeftHand: string;
    heroRightHand: string;
}