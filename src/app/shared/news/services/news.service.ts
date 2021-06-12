import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CoreConfigService } from '../../../core/services/core-config.service';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;
  apiKey: string = this._coreConfig.getApiKey();


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getNews(perPage: string): Observable<any>{
    return this.http.get<any>(`${this.baseURL}?sort=published_desc&limit=${perPage}&access_key=${this.apiKey}&sources=es`).pipe(
      map(({data, pagination: {count, limit, offset, total}}) => ({data:data || [], count: count||0 , limit: limit||0, offset:offset||0, total:total||0 })),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getSearchNews(search:string): Observable<any>{
    if(!search) return of([])
    return this.http.get<any>(`${this.baseURL}?sort=published_desc&keywords=${search}&access_key=${this.apiKey}&sources=es`).pipe(
      catchError((error) => {
        return throwError(error)
      })
    )
  }

}
