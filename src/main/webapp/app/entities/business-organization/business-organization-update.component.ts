import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBusinessOrganization } from 'app/shared/model/business-organization.model';
import { BusinessOrganizationService } from './business-organization.service';

@Component({
    selector: 'jhi-business-organization-update',
    templateUrl: './business-organization-update.component.html'
})
export class BusinessOrganizationUpdateComponent implements OnInit {
    private _businessOrganization: IBusinessOrganization;
    isSaving: boolean;

    constructor(private businessOrganizationService: BusinessOrganizationService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ businessOrganization }) => {
            this.businessOrganization = businessOrganization;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.businessOrganization.id !== undefined) {
            this.subscribeToSaveResponse(this.businessOrganizationService.update(this.businessOrganization));
        } else {
            this.subscribeToSaveResponse(this.businessOrganizationService.create(this.businessOrganization));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBusinessOrganization>>) {
        result.subscribe(
            (res: HttpResponse<IBusinessOrganization>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get businessOrganization() {
        return this._businessOrganization;
    }

    set businessOrganization(businessOrganization: IBusinessOrganization) {
        this._businessOrganization = businessOrganization;
    }
}
