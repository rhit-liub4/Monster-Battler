import { Component } from '@angular/core';
import { HeroService } from '../../services/hero/hero.service';
import { PortalService } from '../../services/portal/portal.service';
import { MonsterService } from '../../services/monster/monster.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EncounterBoxService } from '../../services/encounter/encounter-box.service';
import { Router } from '@angular/router';
import { MathChallenge } from '../../models/math.model';
import { MathService } from '../../services/math/math.service';

@Component({
  selector: 'app-battle-options',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './battle-options.component.html',
  styleUrl: './battle-options.component.css'
})
export class BattleOptionsComponent {
  isAttacking: boolean = false;
  mathChallenge: MathChallenge | null = null;
  playerAnswer: number | null = null;
  monsterDefeated: boolean = false;

  constructor(
    public heroService: HeroService,
    public portalService: PortalService,
    public monsterService: MonsterService,
    public encounterBoxService: EncounterBoxService,
    public mathService: MathService,
    public router: Router
  ) { }

  ngOnInit() {
    this.attackMath("head");
  }

  attack() {
    this.isAttacking = true;
    var atk = this.heroService.atkValue;
    if (this.heroService.leftHand[0]) {
      if (this.heroService.leftHand[0].id == "Weapon") {
        atk = atk + (this.heroService.leftHand[0] as any).atkBonus;
      }
    }
    if (this.heroService.rightHand[0]) {
      if (this.heroService.rightHand[0].id == "Weapon") {
        atk = atk + (this.heroService.rightHand[0] as any).atkBonus;
      }
    }
    this.monsterService.monster.hp = this.monsterService.monster.hp - atk;
    // console.log(this.monsterService.monster.hp);
    if (this.monsterService.monster.hp <= 0) {
        this.monsterDefeated = true;
        this.monsterService.monster.hp = 0;
        this.encounterBoxService.monsterDefeated();
        // console.log("Monster Defeated");
        this.heroService.addTokens(this.monsterService.monster.tokens);
      }
    // console.log("HP: " + this.monsterService.monster.hp)

    // Reset animation state after short delay so it can replay
    setTimeout(() => {
      this.isAttacking = false;
    }, 400); // duration should match the CSS animation time
  }


  submitAnswer() {
    if (this.mathChallenge && !(this.monsterDefeated)) {
      if (Number(this.playerAnswer) === this.mathChallenge.answer) {
        this.attack(); // use your attack logic
        this.encounterBoxService.submitAnswer(true);
      } else {
        this.heroService.updateHealth(-this.monsterService.monster.attack);
        console.log(this.heroService.hero.heroHealth);
        this.encounterBoxService.submitAnswer(false);
      }
      this.playerAnswer = null;
      this.attackMath('head');
    }
  }

  talk() {
    this.encounterBoxService.talk();
  }

  usePowers() {
    this.encounterBoxService.powers();
  }

  run() {
    this.encounterBoxService.run();
  }

  nextMonster() {
    this.portalService.setCurrentCount(this.portalService.getCurrentCount() + 1);
    this.monsterService.monster = this.portalService.getCurrentMonster();
    this.monsterDefeated = false;
    this.monsterService.monsterMaxHealth = this.portalService.getCurrentMonster().hp;
    // console.log(this.monsterService.monster.attack);
  }

  goBackToCamp() {
    this.portalService.setCurrentCount(0);
    this.router.navigate(['/camp']);
  }

  attackMath(targetArea: string) {
    this.mathChallenge = this.mathService.generateChallenge(targetArea);
  }

}
