import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { catchError, combineLatest, EMPTY, takeUntil } from 'rxjs';

import { Destroyable } from '../../utils/destroyable.util';
import { ViewState } from './../../enums/view-state.enum';
import { Product } from './components/make-an-order/interfaces/product.interface';

@Component({
    selector: 'omega-clients-view',
    templateUrl: './clients-view.component.html',
    styleUrls: ['./clients-view.component.scss']
})
export class ClientsViewComponent extends Destroyable implements OnInit {
    public viewState: ViewState = ViewState.LOADING;
    public ViewState: typeof ViewState = ViewState;
    public products: [Product[], Product[], Product[], Product[]];

    constructor(private httpClient: HttpClient) {
        super();
    }

    public ngOnInit(): void {
        this.getProductsData();
    }

    private getProductsData(): void {
        combineLatest([
            this.httpClient.get<Product[]>(`/api/oscypeks`),
            this.httpClient.get<Product[]>(`/api/types`),
            this.httpClient.get<Product[]>(`/api/sizes`),
            this.httpClient.get<Product[]>(`/api/extras`),
        ])
            .pipe(
                catchError(() => {
                    this.viewState = ViewState.ERROR;
                    return EMPTY;
                }),
                takeUntil(this.destroyed$)
            )
            .subscribe((products: [Product[], Product[], Product[], Product[]]) => {
                this.products = products;
                this.viewState = ViewState.SUCCESS;
            });
    }
}
