/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrefWebAppTestModule } from '../../../test.module';
import { BusinessServiceComponent } from 'app/entities/business-service/business-service.component';
import { BusinessServiceService } from 'app/entities/business-service/business-service.service';
import { BusinessService } from 'app/shared/model/business-service.model';

describe('Component Tests', () => {
    describe('BusinessService Management Component', () => {
        let comp: BusinessServiceComponent;
        let fixture: ComponentFixture<BusinessServiceComponent>;
        let service: BusinessServiceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrefWebAppTestModule],
                declarations: [BusinessServiceComponent],
                providers: []
            })
                .overrideTemplate(BusinessServiceComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BusinessServiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BusinessServiceService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BusinessService(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.businessServices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
