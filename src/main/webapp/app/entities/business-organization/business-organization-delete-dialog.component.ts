import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBusinessOrganization } from 'app/shared/model/business-organization.model';
import { BusinessOrganizationService } from './business-organization.service';

@Component({
    selector: 'jhi-business-organization-delete-dialog',
    templateUrl: './business-organization-delete-dialog.component.html'
})
export class BusinessOrganizationDeleteDialogComponent {
    businessOrganization: IBusinessOrganization;

    constructor(
        private businessOrganizationService: BusinessOrganizationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.businessOrganizationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'businessOrganizationListModification',
                content: 'Deleted an businessOrganization'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-business-organization-delete-popup',
    template: ''
})
export class BusinessOrganizationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ businessOrganization }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BusinessOrganizationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.businessOrganization = businessOrganization;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
