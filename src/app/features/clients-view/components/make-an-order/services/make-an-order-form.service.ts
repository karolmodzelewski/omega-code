import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { MakeAnOrderFormArray } from '../enums/make-an-order-form-array.enum';
import { MakeAnOrderFormControl } from '../enums/make-an-order-form-control.enum';
import { MakeAnOrderFormGroup } from '../enums/make-an-order-form-group.enum';
import { Orders } from './../../../../../interfaces/orders.interface';
import { Order } from './../../../../../interfaces/order.interface';
import { Oscypek } from '../interfaces/oscypek.interface';
import { Extra } from '../interfaces/extra.interface';
import { Customer } from './../../../../../interfaces/customer.interface';

@Injectable()
export class MakeAnOrderFormService {
    public form: FormGroup;
    public preparedOrders$: BehaviorSubject<Orders> = new BehaviorSubject<Orders>(null);

    constructor(private formBuilder: FormBuilder) { }

    public prepareDataToSend(): void {
        const preparedOrders: Orders = {
            customer: this.prepareCustomerData(),
            order: [...this.prepareOscypeksData(), ...this.prepareExtrasData()],
            totalAmount: this.form.get(MakeAnOrderFormControl.TOTAL_AMOUNT).value,
            totalPrice: this.form.get(MakeAnOrderFormControl.TOTAL_PRICE).value,
        };

        this.preparedOrders$.next(preparedOrders);
    }

    public buildForm(): void {
        this.form = this.formBuilder.group({
            [MakeAnOrderFormGroup.CUSTOMER]: this.buildCustomerFormGroup(),
            [MakeAnOrderFormArray.OSCYPEKS]: this.formBuilder.array([
                this.buildOscypeksFormGroup(),
            ]),
            [MakeAnOrderFormArray.EXTRAS]: this.formBuilder.array([
                this.buildExtrasFormGroup(),
            ]),
            [MakeAnOrderFormControl.TOTAL_PRICE]: [''],
            [MakeAnOrderFormControl.TOTAL_AMOUNT]: [''],
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

    public resetSummary(): void {
        this.preparedOrders$.next(null);
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

    private prepareCustomerData() {
        const customer: Customer = {
            name: this.form.get(MakeAnOrderFormGroup.CUSTOMER).get(MakeAnOrderFormControl.NAME).value,
            surname: this.form.get(MakeAnOrderFormGroup.CUSTOMER).get(MakeAnOrderFormControl.SURNAME).value,
            city: this.form.get(MakeAnOrderFormGroup.CUSTOMER).get(MakeAnOrderFormControl.CITY).value,
            postalCode: this.form.get(MakeAnOrderFormGroup.CUSTOMER).get(MakeAnOrderFormControl.POSTAL_CODE).value,
            street: this.form.get(MakeAnOrderFormGroup.CUSTOMER).get(MakeAnOrderFormControl.STREET).value,
            houseNumber: this.form.get(MakeAnOrderFormGroup.CUSTOMER).get(MakeAnOrderFormControl.HOUSE_NUMBER).value,
            flatNumber: this.form.get(MakeAnOrderFormGroup.CUSTOMER).get(MakeAnOrderFormControl.FLAT_NUMBER).value,
        };

        return customer;
    }

    private prepareOscypeksData(): Order[] {
        const oscypeks: Order[] = this.form.get(MakeAnOrderFormArray.OSCYPEKS).value.map((oscypek: Oscypek) => {
            const price: number = this.countOscypekPrice(
                +oscypek[MakeAnOrderFormControl.OSCYPEK].price,
                +oscypek[MakeAnOrderFormControl.TYPE].price,
                +oscypek[MakeAnOrderFormControl.SIZE].price,
                +oscypek[MakeAnOrderFormControl.AMOUNT]
            );

            return {
                name: oscypek[MakeAnOrderFormControl.OSCYPEK].name,
                type: oscypek[MakeAnOrderFormControl.TYPE].name,
                size: oscypek[MakeAnOrderFormControl.SIZE].name,
                amount: +oscypek[MakeAnOrderFormControl.AMOUNT],
                price,
            }
        });

        return oscypeks;
    }

    private prepareExtrasData(): Order[] {
        const extras: Order[] = this.form.get(MakeAnOrderFormArray.EXTRAS).value.map((extra: Extra) => {
            const price: number = this.countExtraPrice(
                +extra[MakeAnOrderFormControl.EXTRA].price,
                +extra[MakeAnOrderFormControl.AMOUNT]
            );

            return {
                name: extra[MakeAnOrderFormControl.EXTRA].name,
                amount: +extra[MakeAnOrderFormControl.AMOUNT],
                price,
            };
        }).filter((extra: Order) => extra.name);

        return extras;
    }

    private countOscypekPrice(oscypekPrice: number, oscypekTypePrice: number, oscypekSizePrice: number, amount: number): number {
        return (oscypekPrice + oscypekTypePrice + oscypekSizePrice) * amount;
    }

    private countExtraPrice(price: number, amount: number): number {
        return price * amount;
    }
}
