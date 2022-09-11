import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'omega-success-infobar',
  templateUrl: './success-infobar.component.html',
  styleUrls: ['./success-infobar.component.scss']
})
export class SuccessInfobarComponent {
    constructor(private router: Router) { }

    public backToDashboard(): void {
        this.router.navigate(['../'])
    }
}
