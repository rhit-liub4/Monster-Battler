
import { ShieldItem } from "../../models/shield.model";
import { HeroService } from "../../services/hero/hero.service";

export class IronShield implements ShieldItem {
    id = 'Weapon';
    name = 'Iron Shield';
    description = 'Blocks 5 Damage';
    restoreAmount = 20;
    icon?: string | undefined;
    blockBonus: number = 10;
    

    constructor(private heroService: HeroService) { }
   
    
    use() {
        console.log(`${this.name} used.`);
    }
}
