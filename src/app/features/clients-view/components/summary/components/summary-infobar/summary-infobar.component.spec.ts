import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SummaryInfobarComponent } from './summary-infobar.component';

describe('SummaryInfobarComponent', () => {
    let component: SummaryInfobarComponent;
    let fixture: ComponentFixture<SummaryInfobarComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SummaryInfobarComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SummaryInfobarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
