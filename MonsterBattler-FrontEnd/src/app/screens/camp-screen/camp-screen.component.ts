import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MerchantCardComponent } from "../../tools/merchant-card/merchant-card.component";
import { PortalService } from '../../services/portal/portal.service';
import { EncounterBoxService } from '../../services/encounter/encounter-box.service';

@Component({
  selector: 'app-camp-screen',
  standalone: true,
  imports: [CommonModule, MerchantCardComponent],
  templateUrl: './camp-screen.component.html',
  styleUrl: './camp-screen.component.css'
})
export class CampScreenComponent {
  portals = [
    { name: 'Beginner Cavern', difficulty: 'Easy', icon: '☺' },
    { name: 'Echoing Peaks', difficulty: 'Medium', icon: '😨' },
    { name: 'Veilspire Ruins', difficulty: 'Hard', icon: '👻' },
    { name: 'Firespoken Wallows', difficulty: 'Medium Hard', icon: '🔥'}
  ];

  constructor(private router: Router,
    private portalService: PortalService, private encounterTextService: EncounterBoxService
  ) {}

  enterPortal(portal: any) {
    console.log(`Entering: ${portal.name}`);
    this.portalService.setPortal(portal.name);
    this.encounterTextService.reset();
    this.router.navigate(['/battlescreen']);
  }

}
