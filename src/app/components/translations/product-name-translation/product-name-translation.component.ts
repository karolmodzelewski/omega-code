import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ProductName } from './enums/product-name.enum';

@Component({
    selector: 'omega-product-name-translation',
    templateUrl: './product-name-translation.component.html',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductNameTranslationComponent {
    @Input()
    public key: string;

    public ProductName: typeof ProductName = ProductName;
}
