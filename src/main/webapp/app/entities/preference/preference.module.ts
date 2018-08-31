import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrefWebAppSharedModule } from 'app/shared';
import {
    PreferenceComponent,
    PreferenceDetailComponent,
    PreferenceUpdateComponent,
    PreferenceDeletePopupComponent,
    PreferenceDeleteDialogComponent,
    preferenceRoute,
    preferencePopupRoute
} from './';

const ENTITY_STATES = [...preferenceRoute, ...preferencePopupRoute];

@NgModule({
    imports: [PrefWebAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PreferenceComponent,
        PreferenceDetailComponent,
        PreferenceUpdateComponent,
        PreferenceDeleteDialogComponent,
        PreferenceDeletePopupComponent
    ],
    entryComponents: [PreferenceComponent, PreferenceUpdateComponent, PreferenceDeleteDialogComponent, PreferenceDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrefWebAppPreferenceModule {}
