import { TestBed } from '@angular/core/testing';

import { MakeAnOrderFormService } from './make-an-order-form.service';

describe('MakeAnOrderFormService', () => {
    let service: MakeAnOrderFormService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MakeAnOrderFormService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
