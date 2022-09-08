export interface Orders {
    customer: Customer;
    order: Order[];
    totalAmount: number;
    price: number;
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

interface Order {
    name: string;
    amount: number;
    size?: string;
    type?: string;
}
