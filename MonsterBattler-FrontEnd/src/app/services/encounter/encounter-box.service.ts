import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncounterBoxService {

  encounterBoxText: string = "You Encountered a Monster!";

  constructor() { }

  talk(){
    this.encounterBoxText = "You tried talking to the monster, and it said nothing..."
  }

  powers(){
    this.encounterBoxText = "Use tokens to use powers";
  }

  run(){
    this.encounterBoxText = "Are you sure you want to run away?";
  }

  submitAnswer(correct: boolean){
    if (correct) {
      this.encounterBoxText = "You got the problem correct!";
    } else{
      this.encounterBoxText = "That is incorrect!"
    }
  }

  reset(){
    this.encounterBoxText = "You Encountered a Monster!";
  }

  monsterDefeated(){
    this.encounterBoxText = "You beat the monster!";
  }
}
