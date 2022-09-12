import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SuccessInfobarComponent } from './success-infobar.component';

describe('SuccessInfobarComponent', () => {
    let component: SuccessInfobarComponent;
    let fixture: ComponentFixture<SuccessInfobarComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SuccessInfobarComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SuccessInfobarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
