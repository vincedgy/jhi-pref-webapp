import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBusinessOrganization } from 'app/shared/model/business-organization.model';

@Component({
    selector: 'jhi-business-organization-detail',
    templateUrl: './business-organization-detail.component.html'
})
export class BusinessOrganizationDetailComponent implements OnInit {
    businessOrganization: IBusinessOrganization;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ businessOrganization }) => {
            this.businessOrganization = businessOrganization;
        });
    }

    previousState() {
        window.history.back();
    }
}
