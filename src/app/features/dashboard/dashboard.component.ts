import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'omega-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    constructor(private router: Router) { }

    public navigateToClientsView(): void {
        // TODO
    }

    public navigateToShepherdsView(): void {
        // TODO
    }
}