import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Monster } from '../../models/monster.model';

const urlBase = 'http://localhost:5160/monster';
@Injectable({
  providedIn: 'root'
})


export class MonsterService {

  monsterMaxHealth: number  = 100;

  public monster: Monster = {
    name: "",
    hp: 0,
    attack: 0,
    type: "",
    portal: "",
    level: 0,
    tokens: 0
  };

  constructor(private http: HttpClient) {

   }

  getMonstersForPortal(portal: string): Observable<Monster[]> {
    return this.http.get<Monster[]>(`${urlBase}/${portal}`);


  }
}
