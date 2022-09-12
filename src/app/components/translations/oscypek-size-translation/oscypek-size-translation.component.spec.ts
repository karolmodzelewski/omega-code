import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OscypekSizeTranslationComponent } from './oscypek-size-translation.component';

describe('OscypekSizeTranslationComponent', () => {
    let component: OscypekSizeTranslationComponent;
    let fixture: ComponentFixture<OscypekSizeTranslationComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [OscypekSizeTranslationComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(OscypekSizeTranslationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
