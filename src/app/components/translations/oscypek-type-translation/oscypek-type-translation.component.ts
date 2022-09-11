import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { OscypekType } from '../../../enums/oscypek-type.enum';

@Component({
    selector: 'omega-oscypek-type-translation',
    templateUrl: './oscypek-type-translation.component.html',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OscypekTypeTranslationComponent {
    @Input()
    public key: string;

    public OscypekType: typeof OscypekType = OscypekType;
}
