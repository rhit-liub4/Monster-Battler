import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from "../../tools/back-button/back-button.component";
import { HeroService } from '../../services/hero/hero.service';
import { Hero } from '../../models/hero.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-merchent-screen',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  templateUrl: './merchent-screen.component.html',
  styleUrl: './merchent-screen.component.css'
})
export class MerchentScreenComponent {
  hero!: Hero;

  constructor(private heroService: HeroService){}

   async ngOnInit() {
      try {
        this.hero = this.heroService.getHero();
      } catch (err) {
        console.error("Failed to load hero", err);
      }
    }

  itemsForSale = [
    { name: 'Health Potion', description: 'Restores 50 HP.', price: 10 },
    { name: 'Mana Elixir', description: 'Restores 30 MP.', price: 12 },
    { name: 'Iron Sword', description: 'Basic melee weapon.', price: 25 },
    { name: 'Iron Shield', description: 'Basic shield', price: 20 }
  ];

  buyItem(item: any) {
    if (this.hero.heroTokens >= item.price) {
      this.hero.heroTokens -= item.price;
      alert(`You bought ${item.name}!`);
    }
    this.heroService.addItem(item.name);
  }

}
