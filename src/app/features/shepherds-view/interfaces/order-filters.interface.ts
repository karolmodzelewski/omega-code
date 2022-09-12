import { OscypekType } from '../../../enums/oscypek-type.enum';
import { OscypekSize } from '../../../enums/oscypek-size.enum';

export interface OrderFilters {
    city: string;
    oscypekType: OscypekType;
    oscypekSize: OscypekSize;
}
