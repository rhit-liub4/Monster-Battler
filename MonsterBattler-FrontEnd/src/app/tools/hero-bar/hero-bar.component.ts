import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../../services/hero/hero.service';
import { Hero } from '../../models/hero.model';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-bar.component.html',
  styleUrl: './hero-bar.component.css'
})
export class HeroBarComponent {
  hero!: Hero;
  isLoading = true;

  constructor(
    private router: Router,
    public heroService: HeroService
  ) { }

  async ngOnInit() {
    try {
      const hero = await firstValueFrom(this.heroService.fetchHero('Sullivan'));
      console.log("Hero loaded:", hero);
      this.heroService.setHero(hero[0]);
      this.hero = hero[0];
    
    } catch (err) {
      console.error("Failed to load hero", err);
    } finally {
      this.isLoading = false;
    }
    
  }

  goToHeroScreen() {
    this.router.navigate(['/heroscreen']);
  }

  

}
