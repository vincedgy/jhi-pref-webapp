import { IPreference } from 'app/shared/model//preference.model';

export interface IBusinessService {
    id?: number;
    name?: string;
    description?: string;
    active?: boolean;
    preferences?: IPreference[];
}

export class BusinessService implements IBusinessService {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public active?: boolean,
        public preferences?: IPreference[]
    ) {
        this.active = this.active || false;
    }
}
