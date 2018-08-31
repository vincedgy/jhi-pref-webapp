import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBusinessService } from 'app/shared/model/business-service.model';

type EntityResponseType = HttpResponse<IBusinessService>;
type EntityArrayResponseType = HttpResponse<IBusinessService[]>;

@Injectable({ providedIn: 'root' })
export class BusinessServiceService {
    private resourceUrl = SERVER_API_URL + 'api/business-services';

    constructor(private http: HttpClient) {}

    create(businessService: IBusinessService): Observable<EntityResponseType> {
        return this.http.post<IBusinessService>(this.resourceUrl, businessService, { observe: 'response' });
    }

    update(businessService: IBusinessService): Observable<EntityResponseType> {
        return this.http.put<IBusinessService>(this.resourceUrl, businessService, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBusinessService>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBusinessService[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
