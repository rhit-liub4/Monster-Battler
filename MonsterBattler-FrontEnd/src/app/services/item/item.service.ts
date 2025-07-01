import { Injectable } from '@angular/core';
import { GameItem } from '../../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private inventory: GameItem[] = [];

  addItem(item: GameItem) {
    this.inventory.push(item);
  }

  useItem(itemId: string) {
    const index = this.inventory.findIndex(item => item.id === itemId);
    if (index > -1) {
      this.inventory[index].use();
      this.inventory.splice(index, 1); 
    }
  }

  getInventory(): GameItem[] {
    return [...this.inventory];
  }
}
