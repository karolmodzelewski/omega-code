import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
        ReactiveFormsModule,
        ShepherdsViewRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        LoadingStateComponent,
        ErrorStateComponent,
    ]
})
export class ShepherdsViewModule { }
