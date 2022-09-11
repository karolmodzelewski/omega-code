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

    public get customerFormGroup(): FormGroup {
        return this.form.get(MakeAnOrderFormGroup.CUSTOMER) as FormGroup;
    }

    public get oscypeksFormArray(): FormArray {
        return this.form.get(MakeAnOrderFormArray.OSCYPEKS) as FormArray;
    }

    public get extrasFormArray(): FormArray {
        return this.form.get(MakeAnOrderFormArray.EXTRAS) as FormArray;
    }

    constructor(private makeAnOrderFormService: MakeAnOrderFormService) {
        super();
    }

    public ngOnInit(): void {
        this.getProductsData();
        this.buildForm();
        this.countTotalPrice();
    }

    public saveOrder(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
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

    private getProductsData(): void {
        const [ oscypeks, types, sizes, extras ] = this.products;

        this.oscypeks = oscypeks;
        this.types = types;
        this.sizes = sizes;
        this.extras = extras;
    }

    private countTotalPrice(): void {
        combineLatest([
            this.oscypeksFormArray.valueChanges.pipe(startWith([])),
            this.extrasFormArray.valueChanges.pipe(startWith([])),
        ])
            .pipe(takeUntil(this.destroyed$))
            .subscribe((products: [Oscypek[], Extra[]]) => {
                const [ oscypeks, extras ] = products;
                let oscypeksPrice: number = 0;
                let extrasPrice: number = 0;

                if (oscypeks.length) {
                    oscypeksPrice += this.countOscypeksPrice(oscypeks);
                }

                if (extras.length) {
                    extrasPrice += this.countExtrasPrice(extras);
                }

                this.totalPrice = oscypeksPrice += extrasPrice;
            });
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
                extrasPrice += +extra[MakeAnOrderFormControl.EXTRA].price;
            }

            if (extra[MakeAnOrderFormControl.AMOUNT]) {
                extrasPrice *= +extra[MakeAnOrderFormControl.AMOUNT];
            }

            extrasPrice += specificProductPrice;
        });

        return extrasPrice;
    }

    private buildForm(): void {
        this.makeAnOrderFormService.buildForm();
        this.form = this.makeAnOrderFormService.form;
    }
}
