import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter, tap,  withLatestFrom } from 'rxjs/operators';
import { NewsActions } from '../actions';
import { NewsService } from '../services/news.service';


@Injectable()
export class NewsEffects {

  loadNews$ = createEffect( () =>
    this.actions$.pipe(
      ofType(NewsActions.loadNews),
      switchMap( ({perPage}) =>
        this._news.getNews(perPage).pipe(
          map( ({data, count, limit, offset, total}): any => NewsActions.saveNews({ news:data || [], count: count || 0, limit: limit || 0, offset: offset || 0, total: total ||0})),
          catchError( () => [NewsActions.saveNews({ news: [] })]),
        )
      )
    )
  );

  loadSearchNews$ = createEffect( () =>
    this.actions$.pipe(
      ofType(NewsActions.loadSearchNews),
      switchMap( ({search}) =>
        this._news.getSearchNews(search).pipe(
          map( (resposne): any => NewsActions.saveSearchNews({ news: resposne?.data || []})),
          catchError( () => [NewsActions.saveSearchNews({ news: [] })]),
        )
      )
    )
  );


  // loadSpanLocationsInit$ = createEffect(() =>
  //   of(NewsActions.loadNews())
  // );

  constructor(
    private actions$: Actions,
    private _news: NewsService,
    private location: Location
  ){}
}
