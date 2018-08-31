import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PrefWebAppEmployeeModule } from './employee/employee.module';
import { PrefWebAppBusinessOrganizationModule } from './business-organization/business-organization.module';
import { PrefWebAppBusinessServiceModule } from './business-service/business-service.module';
import { PrefWebAppPreferenceModule } from './preference/preference.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        PrefWebAppEmployeeModule,
        PrefWebAppBusinessOrganizationModule,
        PrefWebAppBusinessServiceModule,
        PrefWebAppPreferenceModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrefWebAppEntityModule {}
