import { GameItem } from "../../models/item.model";
import { PotionItem } from "../../models/potionItem.model";
import { HeroService } from "../../services/hero/hero.service";

export class ManaPotion implements PotionItem {
    id = 'Potion';
    name = 'Mana Potion';
    description = 'Restores 20 Mana.';
    icon?: string | undefined;
    restoreAmount = 20;

    constructor(private heroService: HeroService) { }
    
    use() {
        // this.heroService.restoreHealth(this.restoreAmount);
        console.log(`${this.name} used.`);
    }
}
