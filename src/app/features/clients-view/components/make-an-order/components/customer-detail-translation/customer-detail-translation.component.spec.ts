import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailTranslationComponent } from './customer-detail-translation.component';

describe('CustomerDetailTranslationComponent', () => {
    let component: CustomerDetailTranslationComponent;
    let fixture: ComponentFixture<CustomerDetailTranslationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ CustomerDetailTranslationComponent ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(CustomerDetailTranslationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
