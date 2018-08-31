import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BusinessService } from 'app/shared/model/business-service.model';
import { BusinessServiceService } from './business-service.service';
import { BusinessServiceComponent } from './business-service.component';
import { BusinessServiceDetailComponent } from './business-service-detail.component';
import { BusinessServiceUpdateComponent } from './business-service-update.component';
import { BusinessServiceDeletePopupComponent } from './business-service-delete-dialog.component';
import { IBusinessService } from 'app/shared/model/business-service.model';

@Injectable({ providedIn: 'root' })
export class BusinessServiceResolve implements Resolve<IBusinessService> {
    constructor(private service: BusinessServiceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((businessService: HttpResponse<BusinessService>) => businessService.body));
        }
        return of(new BusinessService());
    }
}

export const businessServiceRoute: Routes = [
    {
        path: 'business-service',
        component: BusinessServiceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prefWebApp.businessService.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'business-service/:id/view',
        component: BusinessServiceDetailComponent,
        resolve: {
            businessService: BusinessServiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prefWebApp.businessService.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'business-service/new',
        component: BusinessServiceUpdateComponent,
        resolve: {
            businessService: BusinessServiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prefWebApp.businessService.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'business-service/:id/edit',
        component: BusinessServiceUpdateComponent,
        resolve: {
            businessService: BusinessServiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prefWebApp.businessService.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const businessServicePopupRoute: Routes = [
    {
        path: 'business-service/:id/delete',
        component: BusinessServiceDeletePopupComponent,
        resolve: {
            businessService: BusinessServiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prefWebApp.businessService.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
