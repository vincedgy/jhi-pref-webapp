import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBusinessOrganization } from 'app/shared/model/business-organization.model';

type EntityResponseType = HttpResponse<IBusinessOrganization>;
type EntityArrayResponseType = HttpResponse<IBusinessOrganization[]>;

@Injectable({ providedIn: 'root' })
export class BusinessOrganizationService {
    private resourceUrl = SERVER_API_URL + 'api/business-organizations';

    constructor(private http: HttpClient) {}

    create(businessOrganization: IBusinessOrganization): Observable<EntityResponseType> {
        return this.http.post<IBusinessOrganization>(this.resourceUrl, businessOrganization, { observe: 'response' });
    }

    update(businessOrganization: IBusinessOrganization): Observable<EntityResponseType> {
        return this.http.put<IBusinessOrganization>(this.resourceUrl, businessOrganization, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBusinessOrganization>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBusinessOrganization[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
