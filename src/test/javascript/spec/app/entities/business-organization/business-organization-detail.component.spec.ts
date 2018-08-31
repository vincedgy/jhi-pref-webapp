/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrefWebAppTestModule } from '../../../test.module';
import { BusinessOrganizationDetailComponent } from 'app/entities/business-organization/business-organization-detail.component';
import { BusinessOrganization } from 'app/shared/model/business-organization.model';

describe('Component Tests', () => {
    describe('BusinessOrganization Management Detail Component', () => {
        let comp: BusinessOrganizationDetailComponent;
        let fixture: ComponentFixture<BusinessOrganizationDetailComponent>;
        const route = ({ data: of({ businessOrganization: new BusinessOrganization(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrefWebAppTestModule],
                declarations: [BusinessOrganizationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BusinessOrganizationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BusinessOrganizationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.businessOrganization).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
