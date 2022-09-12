import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
    selector: 'omega-back-to-dashboard-button',
    templateUrl: './back-to-dashboard-button.component.html',
    standalone: true,
    imports: [MatIconModule, MatButtonModule],
})
export class BackToDashboardButtonComponent {
    constructor(private router: Router) { }

    public backToDashboard(): void {
        this.router.navigate(['../'])
    }
}
