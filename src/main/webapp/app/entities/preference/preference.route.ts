import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Preference } from 'app/shared/model/preference.model';
import { PreferenceService } from './preference.service';
import { PreferenceComponent } from './preference.component';
import { PreferenceDetailComponent } from './preference-detail.component';
import { PreferenceUpdateComponent } from './preference-update.component';
import { PreferenceDeletePopupComponent } from './preference-delete-dialog.component';
import { IPreference } from 'app/shared/model/preference.model';

@Injectable({ providedIn: 'root' })
export class PreferenceResolve implements Resolve<IPreference> {
    constructor(private service: PreferenceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((preference: HttpResponse<Preference>) => preference.body));
        }
        return of(new Preference());
    }
}

export const preferenceRoute: Routes = [
    {
        path: 'preference',
        component: PreferenceComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'prefWebApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'preference/:id/view',
        component: PreferenceDetailComponent,
        resolve: {
            preference: PreferenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prefWebApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'preference/new',
        component: PreferenceUpdateComponent,
        resolve: {
            preference: PreferenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prefWebApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'preference/:id/edit',
        component: PreferenceUpdateComponent,
        resolve: {
            preference: PreferenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prefWebApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const preferencePopupRoute: Routes = [
    {
        path: 'preference/:id/delete',
        component: PreferenceDeletePopupComponent,
        resolve: {
            preference: PreferenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prefWebApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
