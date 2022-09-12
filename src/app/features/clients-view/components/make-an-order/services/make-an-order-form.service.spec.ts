import { TestBed, waitForAsync } from '@angular/core/testing';

import { MakeAnOrderFormService } from './make-an-order-form.service';

describe('MakeAnOrderFormService', () => {
    let service: MakeAnOrderFormService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: MakeAnOrderFormService, useValue: {} },
            ]
        });
        service = TestBed.inject(MakeAnOrderFormService);
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
