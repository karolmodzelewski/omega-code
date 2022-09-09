import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { ShepherdsViewComponent } from './shepherds-view.component';
import { ShepherdsViewRoutingModule } from './shepherds-view-routing.module';
import { FiltersComponent } from './components/filters/filters.component';
import { ListOfOrdersComponent } from './components/list-of-orders/list-of-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { LoadingStateComponent } from 'src/app/components/loading-state/loading-state.component';
import { ErrorStateComponent } from 'src/app/components/error-state/error-state.component';

@NgModule({
    declarations: [
        ShepherdsViewComponent,
        FiltersComponent,
        ListOfOrdersComponent,
        OrderDetailsComponent
    ],
    imports: [
        CommonModule,
        ShepherdsViewRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatDialogModule,
        LoadingStateComponent,
        ErrorStateComponent,
    ]
})
export class ShepherdsViewModule { }
