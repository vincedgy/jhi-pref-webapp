import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrefWebAppSharedModule } from 'app/shared';
import {
    BusinessServiceComponent,
    BusinessServiceDetailComponent,
    BusinessServiceUpdateComponent,
    BusinessServiceDeletePopupComponent,
    BusinessServiceDeleteDialogComponent,
    businessServiceRoute,
    businessServicePopupRoute
} from './';

const ENTITY_STATES = [...businessServiceRoute, ...businessServicePopupRoute];

@NgModule({
    imports: [PrefWebAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BusinessServiceComponent,
        BusinessServiceDetailComponent,
        BusinessServiceUpdateComponent,
        BusinessServiceDeleteDialogComponent,
        BusinessServiceDeletePopupComponent
    ],
    entryComponents: [
        BusinessServiceComponent,
        BusinessServiceUpdateComponent,
        BusinessServiceDeleteDialogComponent,
        BusinessServiceDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrefWebAppBusinessServiceModule {}
