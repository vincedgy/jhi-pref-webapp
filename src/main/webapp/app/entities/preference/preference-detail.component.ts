import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPreference } from 'app/shared/model/preference.model';

@Component({
    selector: 'jhi-preference-detail',
    templateUrl: './preference-detail.component.html'
})
export class PreferenceDetailComponent implements OnInit {
    preference: IPreference;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ preference }) => {
            this.preference = preference;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
