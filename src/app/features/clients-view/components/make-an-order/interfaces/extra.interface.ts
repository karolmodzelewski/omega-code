import { MakeAnOrderFormControl } from '../enums/make-an-order-form-control.enum';
import { Product } from './product.interface';

export interface Extra {
    [MakeAnOrderFormControl.EXTRA]: Product;
    [MakeAnOrderFormControl.AMOUNT]: number;
}
