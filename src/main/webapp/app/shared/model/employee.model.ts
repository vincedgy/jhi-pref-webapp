import { IPreference } from 'app/shared/model//preference.model';

export const enum Lang {
    FRENCH = 'FRENCH',
    ENGLISH = 'ENGLISH',
    SPANISH = 'SPANISH'
}

export interface IEmployee {
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    lang?: Lang;
    active?: boolean;
    preferences?: IPreference[];
    organizationId?: number;
}

export class Employee implements IEmployee {
    constructor(
        public id?: number,
        public email?: string,
        public firstName?: string,
        public lastName?: string,
        public lang?: Lang,
        public active?: boolean,
        public preferences?: IPreference[],
        public organizationId?: number
    ) {
        this.active = this.active || false;
    }
}
