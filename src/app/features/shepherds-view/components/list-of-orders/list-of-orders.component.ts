import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { catchError, EMPTY, map, takeUntil } from 'rxjs';

import { Destroyable } from '../../../../utils/destroyable.util';
import { DisplayedColumn } from './enums/displayed-column.enum';
import { ViewState } from '../../../../enums/view-state.enum';
import { Orders } from '../../../../interfaces/orders.interface';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { OrderFilters } from '../../interfaces/order-filters.interface';
import { Order } from '../../../../interfaces/order.interface';

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

    // Due to impossibility of handling nested filtering in JSON-Server (this library does not have this function),
    // I used map operator here to handle orders filtering. This should be handled on backend site and because of this
    // problem, I created workaround like this
    public getOrders(orderFilters?: OrderFilters): void {
        this.httpClient.get<Orders[]>(`/api/orders`)
            .pipe(
                catchError(() => {
                    this.viewState = ViewState.ERROR;
                    return EMPTY;
                }),
                map((orders: Orders[]) => orderFilters ? this.getFilteredOrders(orders, orderFilters) : orders),
                takeUntil(this.destroyed$)
            )
            .subscribe((orders: Orders[]) => {
                this.orders = orders;
                this.viewState = ViewState.SUCCESS;
            });
    }

    private getFilteredOrders(orders: Orders[], orderFilters: OrderFilters): Orders[] {
        const filteredOrders: Orders[] = orders.filter((orders: Orders) => {
            let result: boolean = true;

            if (orderFilters?.city) {
                result = result && orders.customer.city.toLowerCase().includes(orderFilters?.city.toLowerCase());
            }

            if (orderFilters?.oscypekType) {
                result = result && orders.order.some((order: Order) => order.type === orderFilters?.oscypekType);
            }

            if (orderFilters?.oscypekSize) {
                result = result && orders.order.some((order: Order) => order.size === orderFilters?.oscypekSize);
            }

            return result;
        });

        return filteredOrders;
    }
}
