import { FormArray, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { combineLatest, takeUntil } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { MakeAnOrderFormControl } from './enums/make-an-order-form-control.enum';
import { MakeAnOrderFormGroup } from './enums/make-an-order-form-group.enum';
import { MakeAnOrderFormArray } from './enums/make-an-order-form-array.enum';
import { Product } from './interfaces/product.interface';
import { Destroyable } from '../../../../utils/destroyable.util';
import { Oscypek } from './interfaces/oscypek.interface';
import { Extra } from './interfaces/extra.interface';
import { MakeAnOrderFormService } from './services/make-an-order-form.service';

@Component({
    selector: 'omega-make-an-order',
    templateUrl: './make-an-order.component.html',
    styleUrls: ['./make-an-order.component.scss']
})
export class MakeAnOrderComponent extends Destroyable implements OnInit {
    @Input()
    public products: [Product[], Product[], Product[], Product[]];

    public form: FormGroup;
    public MakeAnOrderFormControl: typeof MakeAnOrderFormControl = MakeAnOrderFormControl;
    public MakeAnOrderFormGroup: typeof MakeAnOrderFormGroup = MakeAnOrderFormGroup;
    public MakeAnOrderFormArray: typeof MakeAnOrderFormArray = MakeAnOrderFormArray;
    public extras: Product[] = [];
    public oscypeks: Product[] = [];
    public types: Product[] = [];
    public sizes: Product[] = [];
    public totalPrice: number = 0;
    public totalAmount: number = 0;

    public get customerFormGroup(): FormGroup {
        return this.form?.get(MakeAnOrderFormGroup.CUSTOMER) as FormGroup;
    }

    public get oscypeksFormArray(): FormArray {
        return this.form?.get(MakeAnOrderFormArray.OSCYPEKS) as FormArray;
    }

    public get extrasFormArray(): FormArray {
        return this.form?.get(MakeAnOrderFormArray.EXTRAS) as FormArray;
    }

    public get isFormDisabled(): boolean {
        return this.form?.disabled;
    }

    constructor(private makeAnOrderFormService: MakeAnOrderFormService) {
        super();
    }

    public ngOnInit(): void {
        this.getProductsData();
        this.buildForm();
        this.getTotalPriceAndAmount();
    }

    public saveOrder(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        if (this.form.valid) {
            this.prepareDataToSend();
        }
    }

    public addProduct(formArray: MakeAnOrderFormArray, event: Event): void {
        event.preventDefault();

        switch (formArray) {
            case MakeAnOrderFormArray.OSCYPEKS:
                this.oscypeksFormArray.push(this.makeAnOrderFormService.buildOscypeksFormGroup());
                break;
            case MakeAnOrderFormArray.EXTRAS:
                this.extrasFormArray.push(this.makeAnOrderFormService.buildExtrasFormGroup());
                break;
        }
    }

    public removeProduct(formArray: MakeAnOrderFormArray, index: number, event: Event): void {
        event.preventDefault();

        switch (formArray) {
            case MakeAnOrderFormArray.OSCYPEKS:
                this.oscypeksFormArray.removeAt(index);
                break;
            case MakeAnOrderFormArray.EXTRAS:
                this.extrasFormArray.removeAt(index);
                break;
        }
    }

    public validateNumericOnly(event: KeyboardEvent): boolean {
        const numericPattern: RegExp = /^\d*$/;

        return numericPattern.test(event.key);
    }

    public iterateByOriginalOrder = (): number => 0;

    private prepareDataToSend(): void {
        this.form.get(MakeAnOrderFormControl.TOTAL_PRICE).setValue(this.totalPrice);
        this.form.get(MakeAnOrderFormControl.TOTAL_AMOUNT).setValue(this.totalAmount);

        this.makeAnOrderFormService.prepareDataToSend();
    }

    private getProductsData(): void {
        if (!this.products) {
            return;
        }

        const [ oscypeks, types, sizes, extras ] = this.products;

        this.oscypeks = oscypeks;
        this.types = types;
        this.sizes = sizes;
        this.extras = extras;
    }

    private getTotalPriceAndAmount(): void {
        if (!this.oscypeksFormArray || !this.extrasFormArray) {
            return;
        }

        combineLatest([
            this.oscypeksFormArray?.valueChanges.pipe(startWith([])),
            this.extrasFormArray?.valueChanges.pipe(startWith([])),
        ])
            .pipe(takeUntil(this.destroyed$))
            .subscribe((products: [Oscypek[], Extra[]]) => this.countTotalPriceAndAmount(products));
    }

    private countTotalPriceAndAmount(products: [Oscypek[], Extra[]]): void {
        const [ oscypeks, extras ] = products;
        let oscypeksPrice: number = 0;
        let oscypeksAmount: number = 0;
        let extrasPrice: number = 0;
        let extrasAmount: number = 0;

        if (oscypeks.length) {
            oscypeksPrice += this.countOscypeksPrice(oscypeks);
            oscypeksAmount += this.countOscypeksAmount(oscypeks);
        }

        if (extras.length) {
            extrasPrice += this.countExtrasPrice(extras);
            extrasAmount += this.countExtrasAmount(extras);
        }

        this.totalPrice = oscypeksPrice += extrasPrice;
        this.totalAmount = oscypeksAmount += extrasAmount;
    }

    private countOscypeksPrice(oscypeks: Oscypek[]): number {
        let oscypeksPrice: number = 0;

        oscypeks.forEach((oscypek: Oscypek) => {
            let specificProductPrice: number = 0;

            if (oscypek[MakeAnOrderFormControl.OSCYPEK]) {
                specificProductPrice += +oscypek[MakeAnOrderFormControl.OSCYPEK].price;
            }

            if (oscypek[MakeAnOrderFormControl.TYPE]) {
                specificProductPrice += +oscypek[MakeAnOrderFormControl.TYPE].price;
            }

            if (oscypek[MakeAnOrderFormControl.SIZE]) {
                specificProductPrice += +oscypek[MakeAnOrderFormControl.SIZE].price;
            }

            if (oscypek[MakeAnOrderFormControl.AMOUNT]) {
                specificProductPrice *= +oscypek[MakeAnOrderFormControl.AMOUNT];
            }

            oscypeksPrice += specificProductPrice;
        });

        return oscypeksPrice;
    }

    private countExtrasPrice(extras: Extra[]): number {
        let extrasPrice: number = 0;

        extras.forEach((extra: Extra) => {
            let specificProductPrice: number = 0;

            if (extra[MakeAnOrderFormControl.EXTRA]) {
                specificProductPrice += +extra[MakeAnOrderFormControl.EXTRA].price;
            }

            if (extra[MakeAnOrderFormControl.AMOUNT]) {
                specificProductPrice *= +extra[MakeAnOrderFormControl.AMOUNT];
            }

            extrasPrice += specificProductPrice;
        });

        return extrasPrice;
    }

    private countOscypeksAmount(oscypeks: Oscypek[]): number {
        let oscypeksAmount: number = 0;

        oscypeks.forEach((oscypek: Oscypek) => oscypeksAmount += +oscypek[MakeAnOrderFormControl.AMOUNT]);

        return oscypeksAmount;
    }

    private countExtrasAmount(extras: Extra[]): number {
        let extrasAmount: number = 0;

        extras.forEach((extra: Extra) => {
            if (extra[MakeAnOrderFormControl.EXTRA].name) {
                extrasAmount += +extra[MakeAnOrderFormControl.AMOUNT]
            }
        });

        return extrasAmount;
    }

    private buildForm(): void {
        this.makeAnOrderFormService.buildForm();
        this.form = this.makeAnOrderFormService.form;
    }
}
