import { OscypekType } from '../components/filters/enums/oscypek-type.enum';
import { OscypekSize } from '../components/filters/enums/oscypek-size.enum';

export interface OrderFilters {
    city: string;
    oscypekType: OscypekType;
    oscypekSize: OscypekSize;
}
