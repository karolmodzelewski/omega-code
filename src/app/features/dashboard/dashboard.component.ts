import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Route } from '../../enums/route.enum';

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
        this.router.navigate([Route.SHEPHERDS_VIEW]);
    }
}
