import { Injectable } from '@angular/core';
import { MathChallenge } from '../../models/math.model';

@Injectable({
  providedIn: 'root'
})
export class MathService {
  

  constructor() { }

  generateChallenge(targetArea: string): MathChallenge {
    const zone = this.getBodyZone(targetArea); // 'upperbody' or 'lowerbody'
    const die = this.pickWeightedDie(zone);     // e.g., 4, 6, 8, 10, 12
    const rolls = [this.rollDie(die), this.rollDie(die)];

    const op = Math.random() < 0.5 ? '+' : '-';
    const question = `${rolls[0]} ${op} ${rolls[1]}`;
    const answer = this.safeEval(rolls[0], rolls[1], op);

    return {
      question,
      answer,
      die,
      rolls
    };
  }

  getBodyZone(area: string): 'upperbody' | 'lowerbody' {
    const upper = ['head', 'neck', 'chest', 'shoulders', 'arms'];
    const lower = ['stomach', 'hips', 'legs', 'feet'];

    if (upper.includes(area.toLowerCase())) return 'upperbody';
    if (lower.includes(area.toLowerCase())) return 'lowerbody';

    return Math.random() < 0.5 ? 'upperbody' : 'lowerbody'; // fallback
  }

  pickWeightedDie(zone: 'upperbody' | 'lowerbody'): number {
    const dicePool = zone === 'upperbody'
      ? [4, 6, 8, 10, 12, 12, 10, 8]  // heavier on high dice
      : [4, 4, 6, 6, 8, 10];          // heavier on low dice

    const randomIndex = Math.floor(Math.random() * dicePool.length);
    return dicePool[randomIndex];
  }

  rollDie(sides: number): number {
    return Math.floor(Math.random() * sides) + 1;
  }

  safeEval(a: number, b: number, op: string): number {
    return op === '+' ? a + b : a - b;
  }
}
