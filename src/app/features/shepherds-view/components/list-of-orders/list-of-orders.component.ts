import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { catchError, EMPTY, takeUntil } from 'rxjs';

import { Destroyable } from '../../../../utils/destroyable.util';
import { DisplayedColumn } from './enums/displayed-column.enum';
import { ViewState } from '../../../../enums/view-state.enum';
import { Orders } from '../../interfaces/orders.interface';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
    selector: 'omega-list-of-orders',
    templateUrl: './list-of-orders.component.html',
    styleUrls: ['./list-of-orders.component.scss']
})
export class ListOfOrdersComponent extends Destroyable implements OnInit {
    public orders: Orders[] = [];
    public displayedColumns: string[] = [DisplayedColumn.CUSTOMER, DisplayedColumn.CITY, DisplayedColumn.AMOUNT, DisplayedColumn.DETAILS];
    public DisplayedColumn: typeof DisplayedColumn = DisplayedColumn;
    public ViewState: typeof ViewState = ViewState;
    public viewState: ViewState = ViewState.LOADING;

    constructor(private httpClient: HttpClient, private dialog: MatDialog) {
        super();
    }

    public ngOnInit(): void {
        this.getOrders();
    }

    public showOrderDetails(order: Orders): void {
        this.dialog.open(OrderDetailsComponent, {
            panelClass: 'order-details-panel-class',
            data: order,
        });
    }

    private getOrders(): void {
        this.httpClient.get<Orders[]>('/api/orders')
            .pipe(
                catchError(() => {
                    this.viewState = ViewState.ERROR;
                    return EMPTY;
                }),
                takeUntil(this.destroyed$)
            )
            .subscribe((orders: Orders[]) => {
                this.orders = orders;
                this.viewState = ViewState.SUCCESS;
            });
    }
}
