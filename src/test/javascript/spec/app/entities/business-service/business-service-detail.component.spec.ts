/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrefWebAppTestModule } from '../../../test.module';
import { BusinessServiceDetailComponent } from 'app/entities/business-service/business-service-detail.component';
import { BusinessService } from 'app/shared/model/business-service.model';

describe('Component Tests', () => {
    describe('BusinessService Management Detail Component', () => {
        let comp: BusinessServiceDetailComponent;
        let fixture: ComponentFixture<BusinessServiceDetailComponent>;
        const route = ({ data: of({ businessService: new BusinessService(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrefWebAppTestModule],
                declarations: [BusinessServiceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BusinessServiceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BusinessServiceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.businessService).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
