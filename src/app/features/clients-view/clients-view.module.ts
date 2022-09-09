import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsViewComponent } from './clients-view.component';
import { BackToDashboardButtonComponent } from 'src/app/components/back-to-dashboard-button/back-to-dashboard-button.component';
import { ClientsViewRoutingModule } from './clients-view-routing.module';

@NgModule({
    declarations: [
        ClientsViewComponent,
    ],
    imports: [
        CommonModule,
        ClientsViewRoutingModule,
        BackToDashboardButtonComponent,
    ]
})
export class ClientsViewModule { }
