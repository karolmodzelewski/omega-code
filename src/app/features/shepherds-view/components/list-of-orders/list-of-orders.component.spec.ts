import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { ListOfOrdersComponent } from './list-of-orders.component';

describe('ListOfOrdersComponent', () => {
    let component: ListOfOrdersComponent;
    let fixture: ComponentFixture<ListOfOrdersComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ListOfOrdersComponent],
            providers: [
                HttpClient,
                HttpHandler,
                { provide: MatDialog, useValue: {} },
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ListOfOrdersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
