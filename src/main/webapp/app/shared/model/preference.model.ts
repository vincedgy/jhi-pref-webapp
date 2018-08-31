export interface IPreference {
    id?: number;
    active?: boolean;
    content?: any;
    employeeId?: number;
    businessServiceId?: number;
}

export class Preference implements IPreference {
    constructor(
        public id?: number,
        public active?: boolean,
        public content?: any,
        public employeeId?: number,
        public businessServiceId?: number
    ) {
        this.active = this.active || false;
    }
}
