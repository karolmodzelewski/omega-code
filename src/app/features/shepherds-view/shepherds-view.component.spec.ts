import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShepherdsViewComponent } from './shepherds-view.component';

describe('ShepherdsViewComponent', () => {
  let component: ShepherdsViewComponent;
  let fixture: ComponentFixture<ShepherdsViewComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ShepherdsViewComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ShepherdsViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
