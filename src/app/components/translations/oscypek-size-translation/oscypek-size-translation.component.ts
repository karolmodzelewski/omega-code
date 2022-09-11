import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { OscypekSize } from '../../../enums/oscypek-size.enum';
@Component({
    selector: 'omega-oscypek-size-translation',
    templateUrl: './oscypek-size-translation.component.html',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OscypekSizeTranslationComponent {
    @Input()
    public key: string;

    public OscypekSize: typeof OscypekSize = OscypekSize;
}
