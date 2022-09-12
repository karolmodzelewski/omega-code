import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Orders } from '../../../../interfaces/orders.interface';

@Component({
    selector: 'omega-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
    public clientsOrder: Orders;

    constructor(@Inject(MAT_DIALOG_DATA) private data: Orders, private dialogRef: MatDialogRef<OrderDetailsComponent>) { }

    public ngOnInit(): void {
        this.setOrder();
    }

    public closePopup(): void {
        this.dialogRef.close();
    }

    private setOrder(): void {
        this.clientsOrder = this.data;
    }
}
