import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBusinessService } from 'app/shared/model/business-service.model';

@Component({
    selector: 'jhi-business-service-detail',
    templateUrl: './business-service-detail.component.html'
})
export class BusinessServiceDetailComponent implements OnInit {
    businessService: IBusinessService;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ businessService }) => {
            this.businessService = businessService;
        });
    }

    previousState() {
        window.history.back();
    }
}
