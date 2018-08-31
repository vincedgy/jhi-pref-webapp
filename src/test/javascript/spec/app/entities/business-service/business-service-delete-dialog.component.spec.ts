/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrefWebAppTestModule } from '../../../test.module';
import { BusinessServiceDeleteDialogComponent } from 'app/entities/business-service/business-service-delete-dialog.component';
import { BusinessServiceService } from 'app/entities/business-service/business-service.service';

describe('Component Tests', () => {
    describe('BusinessService Management Delete Component', () => {
        let comp: BusinessServiceDeleteDialogComponent;
        let fixture: ComponentFixture<BusinessServiceDeleteDialogComponent>;
        let service: BusinessServiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrefWebAppTestModule],
                declarations: [BusinessServiceDeleteDialogComponent]
            })
                .overrideTemplate(BusinessServiceDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BusinessServiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BusinessServiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
