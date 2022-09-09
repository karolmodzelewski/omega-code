import { Order } from './order.interface';

export interface Orders {
    customer: Customer;
    order: Order[];
    totalAmount: number;
    totalPrice: number;
}

interface Customer {
    name: string;
    surname: string;
    city: string;
    postalCode: string;
    street: string;
    houseNumber: string;
    flatNumber: string;
}
