import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OscypekSizeTranslationComponent } from './oscypek-size-translation.component';

describe('OscypekSizeTranslationComponent', () => {
    let component: OscypekSizeTranslationComponent;
    let fixture: ComponentFixture<OscypekSizeTranslationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ OscypekSizeTranslationComponent ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(OscypekSizeTranslationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
