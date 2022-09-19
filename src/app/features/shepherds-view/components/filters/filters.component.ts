import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { debounceTime, distinctUntilChanged, combineLatest, takeUntil, Observable } from 'rxjs';
import { map, skip, startWith } from 'rxjs/operators';

import { Destroyable } from '../../../../utils/destroyable.util';
import { Orders } from '../../../../interfaces/orders.interface';
import { OrderFilterFormControl } from './enums/order-filter-form-control.enum';
import { OscypekSize } from '../../../../enums/oscypek-size.enum';
import { OscypekType } from '../../../../enums/oscypek-type.enum';
import { OrderFilters } from '../../interfaces/order-filters.interface';
import { OrderFiltersForm } from './types/order-filters-form.type';

@Component({
    selector: 'omega-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss']
})
export class FiltersComponent extends Destroyable implements OnInit {
    @Input()
    public orders: Orders[];

    @Output()
    public filtersEmitter: EventEmitter<OrderFilters> = new EventEmitter<OrderFilters>();

    public oscypekSizes: string[] = Object.values(OscypekSize);
    public oscypekTypes: string[] = Object.values(OscypekType);
    public OrderFilterFormControl: typeof OrderFilterFormControl = OrderFilterFormControl;
    public form: FormGroup = this.formBuilder.group({
        [OrderFilterFormControl.CITY]: [''],
        [OrderFilterFormControl.OSCYPEK_SIZE]: [''],
        [OrderFilterFormControl.OSCYPEK_TYPE]: [''],
    });

    constructor(private formBuilder: FormBuilder) {
        super();
    }

    public ngOnInit(): void {
        this.initFiltersListener();
    }

    public resetFilters(): void {
        this.form.reset();
    }

    private initFiltersListener(): void {
        const city$: Observable<string> = this.getFormControlValue$(OrderFilterFormControl.CITY, 600);
        const oscypekType$: Observable<OscypekType> = this.getFormControlValue$(OrderFilterFormControl.OSCYPEK_TYPE, 300);
        const oscypekSize$: Observable<OscypekSize> = this.getFormControlValue$(OrderFilterFormControl.OSCYPEK_SIZE, 300);

        combineLatest([city$, oscypekType$, oscypekSize$])
            .pipe(
                skip(1),
                map((data: OrderFiltersForm) => {
                    const filters: OrderFilters = {
                        city: data[0],
                        oscypekType: data[1] as OscypekType,
                        oscypekSize: data[2] as OscypekSize
                    };

                return filters;
            }))
            .subscribe((filters: OrderFilters) => this.filtersEmitter.emit(filters))
    }

    private getFormControlValue$<T>(formControl: OrderFilterFormControl, time: number): Observable<T> {
        return this.form.get(formControl)?.valueChanges
            .pipe(
                startWith(null),
                debounceTime(time),
                distinctUntilChanged(),
                takeUntil(this.destroyed$)
            ) as Observable<T>;
    }
}
