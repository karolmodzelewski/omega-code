import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, catchError, EMPTY, takeUntil, tap } from 'rxjs';

import { Destroyable } from '../../../../utils/destroyable.util';
import { MakeAnOrderFormService } from '../make-an-order/services/make-an-order-form.service';
import { Orders } from './../../../../interfaces/orders.interface';
import { ViewState } from './../../../../enums/view-state.enum';

@Component({
    selector: 'omega-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class SummaryComponent extends Destroyable implements OnInit {
    public orderSummary$: BehaviorSubject<Orders> = new BehaviorSubject<Orders>(null);
    public viewState: ViewState;
    public ViewState: typeof ViewState = ViewState;

    public get isFormDisabled(): boolean {
        return this.makeAnOrderFormService.form.disabled;
    }

    constructor(private makeAnOrderFormService: MakeAnOrderFormService, private httpClient: HttpClient) {
        super();
    }

    public ngOnInit(): void {
        this.orderSummary$ = this.makeAnOrderFormService.preparedOrders$;
    }

    public submitOrder(): void {
        if (this.viewState === ViewState.SUCCESS || this.viewState === ViewState.LOADING) {
            return;
        }

        this.httpClient.post('/api/orders', this.orderSummary$.getValue())
            .pipe(
                tap(() => this.viewState = ViewState.LOADING),
                catchError(() => {
                    this.viewState = ViewState.ERROR;
                    return EMPTY;
                }),
                takeUntil(this.destroyed$)
            )
            .subscribe(() => {
                this.viewState = ViewState.SUCCESS;
                this.makeAnOrderFormService.form.disable();
            });
    }
}
