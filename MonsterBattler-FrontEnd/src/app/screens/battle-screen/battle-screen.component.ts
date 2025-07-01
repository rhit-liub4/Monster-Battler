import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PortalService } from '../../services/portal/portal.service';
import { MonsterService } from '../../services/monster/monster.service';
import { Monster } from '../../models/monster.model';
import { CommonModule } from '@angular/common';
import { HeroService } from '../../services/hero/hero.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { BattleOptionsComponent } from "../../tools/battle-options/battle-options.component";



@Component({
  selector: 'app-battle-screen',
  standalone: true,
  imports: [CommonModule, FormsModule, BattleOptionsComponent],
  templateUrl: './battle-screen.component.html',
  styleUrl: './battle-screen.component.css'
})
export class BattleScreenComponent {
  monsterMaxHealth: number = 100;
  previousPortalName: string = '';
  portalName: string = '';
  monsters: Monster[] = [];

  constructor(
    public heroService: HeroService,
    public portalService: PortalService,
    public monsterService: MonsterService,
    public router: Router

  ) { }

  async ngOnInit() {
    this.previousPortalName = this.portalName;
    this.portalName = this.portalService.getPortal();

    // Only fetch if portal has not been loaded yet
    if ((this.portalService.monsters.length === 0) || (this.portalName != this.previousPortalName)) {
      console.log(`Requesting monsters for portal: ${this.portalName}`);
      this.monsterService.getMonstersForPortal(this.portalName).subscribe({
        next: (data: Monster[]) => {
          this.portalService.monsters = data;
          this.monsters = this.portalService.getMonsters();
          this.monsterService.monsterMaxHealth = this.portalService.getCurrentMonster().hp;
          this.monsterService.monster = this.portalService.getCurrentMonster();
        },
        error: (err) => {
          console.error("Failed to load monsters", err);
        }
      });
    } else {
      // Already loaded — just use existing state
      this.monsters = this.portalService.getMonsters();
      this.monsterService.monsterMaxHealth = this.portalService.getCurrentMonster().hp;
      this.monsterService.monster = this.portalService.getCurrentMonster();
    }
  }

  getMonsterHpPercent() {
    console.log("Max health" + this.monsterService.monsterMaxHealth);
    return (this.monsterService.monster.hp / this.monsterService.monsterMaxHealth) * 100;

  }

}





