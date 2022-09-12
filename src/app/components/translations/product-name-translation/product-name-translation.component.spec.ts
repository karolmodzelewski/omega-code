import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductNameTranslationComponent } from './product-name-translation.component';

describe('ProductNameTranslationComponent', () => {
    let component: ProductNameTranslationComponent;
    let fixture: ComponentFixture<ProductNameTranslationComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ProductNameTranslationComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ProductNameTranslationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
