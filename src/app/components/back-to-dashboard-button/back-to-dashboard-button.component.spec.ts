import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BackToDashboardButtonComponent } from './back-to-dashboard-button.component';

describe('BackToDashboardButtonComponent', () => {
    let component: BackToDashboardButtonComponent;
    let fixture: ComponentFixture<BackToDashboardButtonComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [BackToDashboardButtonComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(BackToDashboardButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
