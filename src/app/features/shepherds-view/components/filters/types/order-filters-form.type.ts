import { OscypekSize } from '../../../../../enums/oscypek-size.enum';
import { OscypekType } from '../../../../../enums/oscypek-type.enum';

export type OrderFiltersForm = (string | OscypekType | OscypekSize)[];
