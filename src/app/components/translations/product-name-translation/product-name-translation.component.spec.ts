import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNameTranslationComponent } from './product-name-translation.component';

describe('ProductNameTranslationComponent', () => {
    let component: ProductNameTranslationComponent;
    let fixture: ComponentFixture<ProductNameTranslationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ ProductNameTranslationComponent ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ProductNameTranslationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
