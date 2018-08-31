import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrefWebAppSharedModule } from 'app/shared';
import {
    BusinessOrganizationComponent,
    BusinessOrganizationDetailComponent,
    BusinessOrganizationUpdateComponent,
    BusinessOrganizationDeletePopupComponent,
    BusinessOrganizationDeleteDialogComponent,
    businessOrganizationRoute,
    businessOrganizationPopupRoute
} from './';

const ENTITY_STATES = [...businessOrganizationRoute, ...businessOrganizationPopupRoute];

@NgModule({
    imports: [PrefWebAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BusinessOrganizationComponent,
        BusinessOrganizationDetailComponent,
        BusinessOrganizationUpdateComponent,
        BusinessOrganizationDeleteDialogComponent,
        BusinessOrganizationDeletePopupComponent
    ],
    entryComponents: [
        BusinessOrganizationComponent,
        BusinessOrganizationUpdateComponent,
        BusinessOrganizationDeleteDialogComponent,
        BusinessOrganizationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrefWebAppBusinessOrganizationModule {}
