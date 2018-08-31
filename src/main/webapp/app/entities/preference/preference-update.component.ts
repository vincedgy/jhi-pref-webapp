import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPreference } from 'app/shared/model/preference.model';
import { PreferenceService } from './preference.service';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee';
import { IBusinessService } from 'app/shared/model/business-service.model';
import { BusinessServiceService } from 'app/entities/business-service';

@Component({
    selector: 'jhi-preference-update',
    templateUrl: './preference-update.component.html'
})
export class PreferenceUpdateComponent implements OnInit {
    private _preference: IPreference;
    isSaving: boolean;

    employees: IEmployee[];

    businessservices: IBusinessService[];

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private preferenceService: PreferenceService,
        private employeeService: EmployeeService,
        private businessServiceService: BusinessServiceService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ preference }) => {
            this.preference = preference;
        });
        this.employeeService.query().subscribe(
            (res: HttpResponse<IEmployee[]>) => {
                this.employees = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.businessServiceService.query().subscribe(
            (res: HttpResponse<IBusinessService[]>) => {
                this.businessservices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.preference.id !== undefined) {
            this.subscribeToSaveResponse(this.preferenceService.update(this.preference));
        } else {
            this.subscribeToSaveResponse(this.preferenceService.create(this.preference));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPreference>>) {
        result.subscribe((res: HttpResponse<IPreference>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEmployeeById(index: number, item: IEmployee) {
        return item.id;
    }

    trackBusinessServiceById(index: number, item: IBusinessService) {
        return item.id;
    }
    get preference() {
        return this._preference;
    }

    set preference(preference: IPreference) {
        this._preference = preference;
    }
}
