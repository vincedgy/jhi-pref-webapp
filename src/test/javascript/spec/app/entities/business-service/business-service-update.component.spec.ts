/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrefWebAppTestModule } from '../../../test.module';
import { BusinessServiceUpdateComponent } from 'app/entities/business-service/business-service-update.component';
import { BusinessServiceService } from 'app/entities/business-service/business-service.service';
import { BusinessService } from 'app/shared/model/business-service.model';

describe('Component Tests', () => {
    describe('BusinessService Management Update Component', () => {
        let comp: BusinessServiceUpdateComponent;
        let fixture: ComponentFixture<BusinessServiceUpdateComponent>;
        let service: BusinessServiceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrefWebAppTestModule],
                declarations: [BusinessServiceUpdateComponent]
            })
                .overrideTemplate(BusinessServiceUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BusinessServiceUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BusinessServiceService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BusinessService(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.businessService = entity;
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
                    const entity = new BusinessService();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.businessService = entity;
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
