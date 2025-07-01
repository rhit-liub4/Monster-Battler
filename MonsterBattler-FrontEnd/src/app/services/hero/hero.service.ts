import { Injectable } from '@angular/core';
import { Hero } from '../../models/hero.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HealthPotion } from '../../classes/potions/health-potion';
import { ManaPotion } from '../../classes/potions/mana-potion';
import { GameItem } from '../../models/item.model';
import { IronSword } from '../../classes/weapons/iron-sword';
import { IronShield } from '../../classes/shields/iron-shield';

const urlBase = 'http://localhost:5160/hero';
@Injectable({
  providedIn: 'root'
})

export class HeroService {

  gameItems: GameItem[] = [];
  leftHand: GameItem[] = [];
  rightHand: GameItem[] = [];
  atkValue: number = 5;


   public hero: Hero = {
    heroName: 'Arkyn',
    heroHealth: 100,
    heroMaxHealth: 100,
    heroTokens: 50,
    heroItems: 'Sword',
    heroLeftHand: 'Shield',
    heroRightHand: 'Sword'
  };

  private itemCatalog: { [key: string]: () => GameItem } = {
    "Health Potion": () => new HealthPotion(this),
    "Mana Potion": () => new ManaPotion(this),
    "Iron Sword": () => new IronSword(this),
    "Iron Shield": () => new IronShield(this)
    // Add more item types here
  };


  constructor(private http: HttpClient) { }

  fetchHero(heroName: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${urlBase}/${heroName}`);
  }

  setHero(hero: Hero): void {
    this.hero = hero;
    this.gameItems = this.parseItemsFromString(this.hero.heroItems);
    this.leftHand = this.parseItemsFromString(this.hero.heroLeftHand);
    this.rightHand = this.parseItemsFromString(this.hero.heroRightHand);
  }

  restoreHero(): void {
    this.gameItems = this.parseItemsFromString(this.hero.heroItems);
    this.leftHand = this.parseItemsFromString(this.hero.heroLeftHand);
    this.rightHand = this.parseItemsFromString(this.hero.heroRightHand);
  }

  getHero(): Hero {
    return this.hero;
  }

  updateHealth(amount: number) {
    this.hero.heroHealth = Math.max(0, Math.min(this.hero.heroHealth + amount, this.hero.heroMaxHealth));
    this.updateHero().subscribe(() => {
      console.log('Hero saved after health updating');
    });
  }

  spendTokens(amount: number): boolean {
    if (this.hero.heroTokens >= amount) {
      this.hero.heroTokens -= amount;
      return true;
    }
    return false;
  }

  addItem(item: string) {
    // console.log(item);
    const itemFactory = this.itemCatalog[item];
    // console.log(itemFactory);
    this.gameItems.push(itemFactory());

    this.hero.heroItems = this.hero.heroItems.concat(", ", item);

    // console.log("Pushing Game Items");
    this.updateHero().subscribe(() => {
      console.log('Hero saved to backend.');
    });
  }

  parseItems(itemsString: string): string[] {
    if (!itemsString) return [];
    return itemsString.split('|').map(item => item.trim());
  }

  updateHero(): Observable<any> {
    const updatedHero: Hero = {
      ...this.hero
    };
    console.log("Updating hero!");

    return this.http.put(`${urlBase}/${updatedHero.heroName}`, updatedHero);
  }

  restoreHealth(restoreAmount: number) {
    this.hero.heroHealth = Math.min(this.hero.heroHealth + restoreAmount, this.hero.heroMaxHealth);
    // console.log(`Health restored. Current health: ${this.hero.heroHealth}`);
  }

  parseItemsFromString(input: string): GameItem[] {
    const itemNames = input.split(",").map(name => name.trim());
    const items: GameItem[] = [];
    for (const name of itemNames) {
      const itemFactory = this.itemCatalog[name];
      if (itemFactory) {
        items.push(itemFactory());
      } else {
        console.warn(`Unrecognized item: ${name}`);
      }
    }
    return items;
  }

  useItem(item: GameItem) {
    item.use();

    if (item.id === "Potion") {
      this.removeOneItemFromString(item.name);
      this.removeGameItem(item);
    }

    this.updateHero().subscribe(() => {
      console.log('Hero saved to backend.');
    });
  }

  removeItemById(id: string): void {
    const index = this.gameItems.findIndex(item => item.id === id);
    if (index !== -1) {
      this.gameItems.splice(index, 1); // Remove one item at the found index
    } else {
      console.warn(`Item with id "${id}" not found.`);
    }
  }

  removeOneItemFromString(itemToRemove: string): void {
    const items = this.hero.heroItems
      .split(',')
      .map(item => item.trim());

    const index = items.findIndex(item => item.toLowerCase() === itemToRemove.toLowerCase());

    if (index !== -1) {
      items.splice(index, 1); // Remove the first matching item
    } else {
      console.warn(`Item "${itemToRemove}" not found in heroItems.`);
    }

    this.hero.heroItems = items.join(', ');
  }

  removeGameItem(item: GameItem): void {
    // 1. Remove from gameItems array (by ID)
    const index = this.gameItems.findIndex(g => g.id === item.id);
    if (index !== -1) {
      this.gameItems.splice(index, 1);
    } else {
      console.warn(`GameItem with id "${item.id}" not found in gameItems.`);
    }

    // 2. Remove one occurrence of item.name from hero.heroItems string
    const items = this.hero.heroItems
      .split(',')
      .map(i => i.trim());

    const nameIndex = items.findIndex(i => i.toLowerCase() === item.name.toLowerCase());
    if (nameIndex !== -1) {
      items.splice(nameIndex, 1);
    } else {
      console.warn(`Item "${item.name}" not found in heroItems string.`);
    }

    this.hero.heroItems = items.join(', ');

    // 3. (Optional) Save the update to backend
    this.updateHero().subscribe(() => {
      console.log('Hero updated after removing GameItem.');
    });
  }

  equipItemIntoHand(item: GameItem, hand: string) {
    if (hand === 'left') {
      this.leftHand.push( item);
      this.hero.heroLeftHand = item.name;
    } else if (hand === 'right') {
      this.rightHand.push(item);
      this.hero.heroRightHand = item.name;
    } else {
      console.log("Cannot Identify which hand it is");
    }
    this.updateHero().subscribe(() => {
      console.log('Hero updated after Equpping Item.');
    });
  }

  unEquipItemFromHand(hand: string) {
    if (hand === 'left') {
      this.gameItems.push(this.leftHand[0]);
      this.leftHand = [];
      this.hero.heroLeftHand = '';
    } else if (hand === 'right') {
      this.gameItems.push(this.rightHand[0]);
      this.rightHand = [];
      this.hero.heroRightHand = '';
    } else {
      console.log("Problem Unequipping");
    }
    this.updateHero().subscribe(() => {
      console.log('Hero updated after Unequipping');
    });
  }

  addTokens(tokens: number){
    this.hero.heroTokens += tokens;
    this.updateHero().subscribe(() => {
      console.log('Hero updated after adding tokens');
    })

  }









}

