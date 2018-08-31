/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrefWebAppTestModule } from '../../../test.module';
import { BusinessOrganizationUpdateComponent } from 'app/entities/business-organization/business-organization-update.component';
import { BusinessOrganizationService } from 'app/entities/business-organization/business-organization.service';
import { BusinessOrganization } from 'app/shared/model/business-organization.model';

describe('Component Tests', () => {
    describe('BusinessOrganization Management Update Component', () => {
        let comp: BusinessOrganizationUpdateComponent;
        let fixture: ComponentFixture<BusinessOrganizationUpdateComponent>;
        let service: BusinessOrganizationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrefWebAppTestModule],
                declarations: [BusinessOrganizationUpdateComponent]
            })
                .overrideTemplate(BusinessOrganizationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BusinessOrganizationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BusinessOrganizationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BusinessOrganization(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.businessOrganization = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BusinessOrganization();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.businessOrganization = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
