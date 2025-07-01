import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from "../../tools/back-button/back-button.component";
import { HeroService } from '../../services/hero/hero.service';
import { Hero } from '../../models/hero.model';
import { firstValueFrom } from 'rxjs';
import { GameItem } from '../../models/item.model';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-hero-screen',
  standalone: true,
  imports: [BackButtonComponent, CommonModule, DragDropModule],
  templateUrl: './hero-screen.component.html',
  styleUrl: './hero-screen.component.css'
})
export class HeroScreenComponent {

  hero!: Hero;

  constructor(public heroService: HeroService) { }

  async ngOnInit() {
    try {
      this.hero = this.heroService.getHero();
    } catch (err) {
      console.error("Failed to load hero", err);
    }
  }

  useItem(event: MouseEvent, item: GameItem) {
    event.preventDefault();
    this.heroService.useItem(item);
  }

  equipItem(event: CdkDragDrop<any>, targetSlot: 'left' | 'right' | 'inventory') {
    const { item, source } = event.item.data;

    // Prevent drop if slot already has an item
    if ((targetSlot === 'left' && this.heroService.leftHand.length > 0) ||
      (targetSlot === 'right' && this.heroService.rightHand.length > 0)) {
      console.warn(`Cannot equip more than one item in ${targetSlot} hand.`);
      return;
    }

    // Unequip if coming from hand
    if (source === 'left') {
      this.heroService.leftHand = [];
      this.heroService.hero.heroLeftHand = '';
    } else if (source === 'right') {
      this.heroService.rightHand = [];
      this.heroService.hero.heroRightHand = '';
    } else if (source === 'inventory') {
      this.heroService.removeGameItem(item); // Remove from inventory
    }

    // Equip or send back to inventory
    if (targetSlot === 'left') {
      this.heroService.leftHand = [item];
      this.heroService.hero.heroLeftHand = item.name;
    } else if (targetSlot === 'right') {
      this.heroService.rightHand = [item];
      this.heroService.hero.heroRightHand = item.name;
    } else if (targetSlot === 'inventory') {
      this.heroService.addItem(item.name);
    }

    this.heroService.updateHero().subscribe(() => {
      console.log('Hero updated after drag-and-drop action.');
    });
  }




}
