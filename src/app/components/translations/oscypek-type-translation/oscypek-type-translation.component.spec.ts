import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OscypekTypeTranslationComponent } from './oscypek-type-translation.component';

describe('OscypekTypeTranslationComponent', () => {
    let component: OscypekTypeTranslationComponent;
    let fixture: ComponentFixture<OscypekTypeTranslationComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [OscypekTypeTranslationComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(OscypekTypeTranslationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
