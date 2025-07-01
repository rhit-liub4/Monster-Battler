import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-merchant-card',
  standalone: true,
  imports: [],
  templateUrl: './merchant-card.component.html',
  styleUrl: './merchant-card.component.css'
})
export class MerchantCardComponent {
    constructor(private router: Router) {}
  goToMerchant() {
    this.router.navigate(['/merchentscreen']);
  }


}
