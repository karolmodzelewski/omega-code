import { Customer } from './customer.interface';
import { Order } from './order.interface';

export interface Orders {
    customer: Customer;
    order: Order[];
    totalAmount: number;
    totalPrice: number;
    id?: number;
}
