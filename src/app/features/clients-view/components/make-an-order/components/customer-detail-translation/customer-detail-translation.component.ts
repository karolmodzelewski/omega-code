import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { MakeAnOrderFormControl } from '../../enums/make-an-order-form-control.enum';

@Component({
    selector: 'omega-customer-detail-translation',
    templateUrl: './customer-detail-translation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerDetailTranslationComponent {
    @Input()
    public key: string;

    public MakeAnOrderFormControl: typeof MakeAnOrderFormControl = MakeAnOrderFormControl;
}
