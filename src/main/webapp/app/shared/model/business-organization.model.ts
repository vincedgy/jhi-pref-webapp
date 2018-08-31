import { IEmployee } from 'app/shared/model//employee.model';

export interface IBusinessOrganization {
    id?: number;
    name?: string;
    active?: boolean;
    employees?: IEmployee[];
}

export class BusinessOrganization implements IBusinessOrganization {
    constructor(public id?: number, public name?: string, public active?: boolean, public employees?: IEmployee[]) {
        this.active = this.active || false;
    }
}
