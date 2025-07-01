import { GameItem } from "../../models/item.model";
import { WeaponItem } from "../../models/weapon.model";
import { HeroService } from "../../services/hero/hero.service";

export class IronSword implements WeaponItem {
    id = 'Weapon';
    name = 'Iron Sword';
    description = 'Adds 10 Damage';
    icon?: string | undefined = "iron-sword.svg";
    atkBonus = 10;

    constructor(private heroService: HeroService) { }

    use() {
        // this.heroService.restoreHealth(this.restoreAmount);
        console.log(`${this.name} used.`);
    }
}
