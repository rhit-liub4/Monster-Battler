import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster.model';

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  private currentPortalName: string = '';
  private currentCount: number = 0;
  public monsters: Monster[] = [];

  constructor() { }

  setPortal(name: string) {
    this.currentPortalName = name;
  }

  getPortal(): string{
    return this.currentPortalName;
  }

  getCurrentMonster(): Monster{
    return this.monsters[this.currentCount];
  }

  setCurrentCount(monsterNumber: number){
    this.currentCount = monsterNumber;
  }
  
  getCurrentCount(): number{
    return this.currentCount;
  }

  setMonsters(monsters: Monster[]){
    this.monsters = monsters;
  }

  getMonsters(): Monster[]{
    return this.monsters;
  }

  
}
