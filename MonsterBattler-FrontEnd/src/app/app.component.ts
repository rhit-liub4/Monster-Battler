import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BattleScreenComponent } from "./screens/battle-screen/battle-screen.component";
import { HeroScreenComponent } from "./screens/hero-screen/hero-screen.component";
import { HeroBarComponent } from "./tools/hero-bar/hero-bar.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BattleScreenComponent, HeroScreenComponent, HeroBarComponent, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MonsterBattler-FrontEnd';

  
}
