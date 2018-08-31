import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BusinessOrganization } from 'app/shared/model/business-organization.model';
import { BusinessOrganizationService } from './business-organization.service';
import { BusinessOrganizationComponent } from './business-organization.component';
import { BusinessOrganizationDetailComponent } from './business-organization-detail.component';
import { BusinessOrganizationUpdateComponent } from './business-organization-update.component';
import { BusinessOrganizationDeletePopupComponent } from './business-organization-delete-dialog.component';
import { IBusinessOrganization } from 'app/shared/model/business-organization.model';

@Injectable({ providedIn: 'root' })
export class BusinessOrganizationResolve implements Resolve<IBusinessOrganization> {
    constructor(private service: BusinessOrganizationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((businessOrganization: HttpResponse<BusinessOrganization>) => businessOrganization.body));
        }
        return of(new BusinessOrganization());
    }
}

export const businessOrganizationRoute: Routes = [
    {
        path: 'business-organization',
        component: BusinessOrganizationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prefWebApp.businessOrganization.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'business-organization/:id/view',
        component: BusinessOrganizationDetailComponent,
        resolve: {
            businessOrganization: BusinessOrganizationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prefWebApp.businessOrganization.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'business-organization/new',
        component: BusinessOrganizationUpdateComponent,
        resolve: {
            businessOrganization: BusinessOrganizationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prefWebApp.businessOrganization.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'business-organization/:id/edit',
        component: BusinessOrganizationUpdateComponent,
        resolve: {
            businessOrganization: BusinessOrganizationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prefWebApp.businessOrganization.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const businessOrganizationPopupRoute: Routes = [
    {
        path: 'business-organization/:id/delete',
        component: BusinessOrganizationDeletePopupComponent,
        resolve: {
            businessOrganization: BusinessOrganizationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prefWebApp.businessOrganization.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
