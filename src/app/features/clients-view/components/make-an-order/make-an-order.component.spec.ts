import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { of } from 'rxjs';

import { MakeAnOrderComponent } from './make-an-order.component';
import { MakeAnOrderFormService } from './services/make-an-order-form.service';

describe('MakeAnOrderComponent', () => {
    let component: MakeAnOrderComponent;
    let fixture: ComponentFixture<MakeAnOrderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ MakeAnOrderComponent ],
            providers: [
                { provide: MakeAnOrderFormService, useValue: { buildForm: () => of() } },
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(MakeAnOrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
