import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ErrorStateComponent } from './error-state.component';

describe('ErrorStateComponent', () => {
    let component: ErrorStateComponent;
    let fixture: ComponentFixture<ErrorStateComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ErrorStateComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ErrorStateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
