import { MakeAnOrderFormControl } from '../enums/make-an-order-form-control.enum';
import { Product } from './product.interface';

export interface Oscypek {
    [MakeAnOrderFormControl.OSCYPEK]: Product;
    [MakeAnOrderFormControl.TYPE]: Product;
    [MakeAnOrderFormControl.SIZE]: Product;
    [MakeAnOrderFormControl.AMOUNT]: number;
}
