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
import { LoadingStateComponent } from '../../components/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../components/error-state/error-state.component';
import { BackToDashboardButtonComponent } from '../../components/back-to-dashboard-button/back-to-dashboard-button.component';
import { OscypekTypeTranslationComponent } from '../../components/translations/oscypek-type-translation/oscypek-type-translation.component';
import { OscypekSizeTranslationComponent } from '../../components/translations/oscypek-size-translation/oscypek-size-translation.component';
import { ProductNameTranslationComponent } from '../../components/translations/product-name-translation/product-name-translation.component';

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
        BackToDashboardButtonComponent,
        OscypekTypeTranslationComponent,
        OscypekSizeTranslationComponent,
        ProductNameTranslationComponent,
    ]
})
export class ShepherdsViewModule { }
