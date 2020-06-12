import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class TypeaheadSearchService {

  constructor(private httpClient: HttpClient) { }

  searchElements(url: string, requestModel: any, inputString: string, fieldToFilter: string, extraFilter: object): Observable<any> {
    requestModel[fieldToFilter] = inputString;

    // Aggiungi tutte i campi filtri opzionali
    if (extraFilter) {
      Object.keys(extraFilter).forEach(key => requestModel[key] = extraFilter[key]);
    }

    return this.httpClient.post<any>(url, requestModel);
  }
}
