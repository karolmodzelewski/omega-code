import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { ClientsViewComponent } from './clients-view.component';
import { BackToDashboardButtonComponent } from '../../components/back-to-dashboard-button/back-to-dashboard-button.component';
import { ClientsViewRoutingModule } from './clients-view-routing.module';
import { MakeAnOrderComponent } from './components/make-an-order/make-an-order.component';
import { SummaryComponent } from './components/summary/summary.component';
import { CustomerDetailTranslationComponent } from './components/make-an-order/components/customer-detail-translation/customer-detail-translation.component';
import { OscypekTypeTranslationComponent } from '../../components/translations/oscypek-type-translation/oscypek-type-translation.component';
import { OscypekSizeTranslationComponent } from '../../components/translations/oscypek-size-translation/oscypek-size-translation.component';
import { ProductNameTranslationComponent } from '../../components/translations/product-name-translation/product-name-translation.component';
import { LoadingStateComponent } from './../../components/loading-state/loading-state.component';
import { ErrorStateComponent } from './../../components/error-state/error-state.component';
import { MakeAnOrderFormService } from './components/make-an-order/services/make-an-order-form.service';
import { SummaryInfobarComponent } from './components/summary/components/summary-infobar/summary-infobar.component';
import { SuccessInfobarComponent } from './components/summary/components/success-infobar/success-infobar.component';

@NgModule({
    declarations: [
        ClientsViewComponent,
        MakeAnOrderComponent,
        SummaryComponent,
        CustomerDetailTranslationComponent,
        SummaryInfobarComponent,
        SuccessInfobarComponent
    ],
    imports: [
        CommonModule,
        ClientsViewRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        BackToDashboardButtonComponent,
        OscypekTypeTranslationComponent,
        OscypekSizeTranslationComponent,
        ProductNameTranslationComponent,
        ErrorStateComponent,
        LoadingStateComponent
    ],
    providers: [MakeAnOrderFormService]
})
export class ClientsViewModule { }
