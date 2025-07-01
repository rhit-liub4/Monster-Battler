import { GameItem } from "../../models/item.model";
import { PotionItem } from "../../models/potionItem.model";
import { HeroService } from "../../services/hero/hero.service";

export class HealthPotion implements PotionItem {
    id = 'Potion';
    name = 'Health Potion';
    description = 'Restores 20 health.';
    icon?: string | undefined = 'health-potion.svg';;
    restoreAmount = 20;

    constructor(private heroService: HeroService) { }
    
    use() {
        this.heroService.restoreHealth(this.restoreAmount);
        console.log(`${this.name} used.`);
    }
}
