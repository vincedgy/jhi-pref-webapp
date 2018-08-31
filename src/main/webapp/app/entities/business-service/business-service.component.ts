import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBusinessService } from 'app/shared/model/business-service.model';
import { Principal } from 'app/core';
import { BusinessServiceService } from './business-service.service';

@Component({
    selector: 'jhi-business-service',
    templateUrl: './business-service.component.html'
})
export class BusinessServiceComponent implements OnInit, OnDestroy {
    businessServices: IBusinessService[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private businessServiceService: BusinessServiceService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.businessServiceService.query().subscribe(
            (res: HttpResponse<IBusinessService[]>) => {
                this.businessServices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBusinessServices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBusinessService) {
        return item.id;
    }

    registerChangeInBusinessServices() {
        this.eventSubscriber = this.eventManager.subscribe('businessServiceListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
