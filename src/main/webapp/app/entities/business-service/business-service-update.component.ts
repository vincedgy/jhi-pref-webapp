import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBusinessService } from 'app/shared/model/business-service.model';
import { BusinessServiceService } from './business-service.service';

@Component({
    selector: 'jhi-business-service-update',
    templateUrl: './business-service-update.component.html'
})
export class BusinessServiceUpdateComponent implements OnInit {
    private _businessService: IBusinessService;
    isSaving: boolean;

    constructor(private businessServiceService: BusinessServiceService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ businessService }) => {
            this.businessService = businessService;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.businessService.id !== undefined) {
            this.subscribeToSaveResponse(this.businessServiceService.update(this.businessService));
        } else {
            this.subscribeToSaveResponse(this.businessServiceService.create(this.businessService));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBusinessService>>) {
        result.subscribe((res: HttpResponse<IBusinessService>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get businessService() {
        return this._businessService;
    }

    set businessService(businessService: IBusinessService) {
        this._businessService = businessService;
    }
}
