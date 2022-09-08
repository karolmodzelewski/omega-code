import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'omega-shepherds-view',
  templateUrl: './shepherds-view.component.html',
  styleUrls: ['./shepherds-view.component.scss']
})
export class ShepherdsViewComponent {
    constructor(private router: Router) { }

    public backToDashboard(): void {
        this.router.navigate(['../'])
    }
}
