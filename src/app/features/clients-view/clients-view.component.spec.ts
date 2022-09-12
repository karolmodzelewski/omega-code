import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { of } from 'rxjs';

import { ClientsViewComponent } from './clients-view.component';
import { MakeAnOrderFormService } from './components/make-an-order/services/make-an-order-form.service';

describe('ClientsViewComponent', () => {
    let component: ClientsViewComponent;
    let fixture: ComponentFixture<ClientsViewComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ClientsViewComponent],
            imports: [HttpClientTestingModule],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MakeAnOrderFormService, useValue: { resetSummary: () => of()} },
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ClientsViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
