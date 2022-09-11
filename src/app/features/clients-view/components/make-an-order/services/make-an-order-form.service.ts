import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MakeAnOrderFormArray } from '../enums/make-an-order-form-array.enum';
import { MakeAnOrderFormControl } from '../enums/make-an-order-form-control.enum';
import { MakeAnOrderFormGroup } from '../enums/make-an-order-form-group.enum';

@Injectable()
export class MakeAnOrderFormService {
    public form: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    public buildForm(): void {
        this.form = this.formBuilder.group({
            [MakeAnOrderFormGroup.CUSTOMER]: this.buildCustomerFormGroup(),
            [MakeAnOrderFormArray.OSCYPEKS]: this.formBuilder.array([
                this.buildOscypeksFormGroup(),
            ]),
            [MakeAnOrderFormArray.EXTRAS]: this.formBuilder.array([
                this.buildExtrasFormGroup(),
            ]),
        });
    }

    public buildOscypeksFormGroup(): FormGroup {
        return this.formBuilder.group({
            [MakeAnOrderFormControl.OSCYPEK]: ['', [Validators.required]],
            [MakeAnOrderFormControl.TYPE]: ['', [Validators.required]],
            [MakeAnOrderFormControl.SIZE]: ['', [Validators.required]],
            [MakeAnOrderFormControl.AMOUNT]: [1, [Validators.required, Validators.pattern(/^(?!(0))[0-9]+$/)]],
        });
    }

    public buildExtrasFormGroup(): FormGroup {
        return this.formBuilder.group({
            [MakeAnOrderFormControl.EXTRA]: [''],
            [MakeAnOrderFormControl.AMOUNT]: [1, [Validators.pattern(/^(?!(0))[0-9]+$/)]],
        });
    }

    private buildCustomerFormGroup(): FormGroup {
        return this.formBuilder.group({
            [MakeAnOrderFormControl.NAME]: ['', [Validators.required, Validators.maxLength(50)]],
            [MakeAnOrderFormControl.SURNAME]: ['', [Validators.required, Validators.maxLength(50)]],
            [MakeAnOrderFormControl.CITY]: ['', [Validators.required, Validators.maxLength(80)]],
            [MakeAnOrderFormControl.POSTAL_CODE]: ['', [Validators.required, Validators.maxLength(10)]],
            [MakeAnOrderFormControl.STREET]: ['', [Validators.required, Validators.maxLength(50)]],
            [MakeAnOrderFormControl.HOUSE_NUMBER]: ['', [Validators.required, Validators.maxLength(10)]],
            [MakeAnOrderFormControl.FLAT_NUMBER]: ['', Validators.maxLength(10)],
        });
    }
}
