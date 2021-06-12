import { Component, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { startWith, switchMap, tap, filter } from 'rxjs/operators';
import { fromNews, NewsActions } from 'src/app/shared/news';
import { errorImage, checkObjectLength, trackById } from '../../shared/shared/utils/utils';

@Component({
  selector: 'app-search',
  template:`
    <ion-content [fullscreen]="true">
      <div class="container components-color">

        <!-- HEADER  -->
        <div class="header" no-border>
          <form (submit)="searchSubmit($event)">
            <ion-searchbar color="light" placeholder="Buscar..." [formControl]="search"></ion-searchbar>
          </form>
        </div>

        <ng-container *ngIf="(searchsNews$ | async) as news;">
          <ng-container *ngIf="!(pending$ | async); else loader">
            <ng-container *ngIf="!!showInfo">
              <ng-container *ngIf="news?.length > 0; else noData">

                <ion-card class="container-card ion-activatable ripple-parent fade-in-card" *ngFor="let aNew of news; trackBy: trackById" [routerLink]="['/anew/'+aNew?.title]" [queryParams]="{isNews:false}">
                  <img loading="lazy" [src]="aNew?.image" [alt]="aNew?.title" (error)="errorImage($event, placeholder)"/>
                  <ion-card-header>

                    <ion-card-title class="text-color">{{aNew?.title}}</ion-card-title>
                  </ion-card-header>
                  <ion-card-content class="text-color">{{aNew?.published_at | date:'MMM d, y'}}</ion-card-content>

                  <ion-ripple-effect></ion-ripple-effect>
                </ion-card>

              </ng-container>
            </ng-container>
          </ng-container>
        </ng-container>

         <!-- REFRESH -->
        <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

        <!-- IS NO DATA  -->
        <ng-template #noData>
          <div class="error-serve">
            <span class="text-color">No hay datos</span>
          </div>
        </ng-template>

        <!-- LOADER  -->
        <ng-template #loader>
          <ion-spinner color="primary"></ion-spinner>
        </ng-template>

      </div>
    </ion-content >
  `,
  styleUrls: ['./search.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPage  {

  errorImage = errorImage;
  trackById = trackById;
  placeholder = '../../../assets/images/image_not_found.png';
  showInfo = false;
  pending$: Observable<boolean> = this.store.pipe(select(fromNews.getPending));
  search = new FormControl('');
  searchData$ = new EventEmitter();

  searchsNews$: Observable<any> = this.searchData$.pipe(
    startWith(''),
    tap(data => {
      this.store.dispatch(NewsActions.loadSearchNews({search: data}))
    } ),
    switchMap(() => this.store.pipe(select(fromNews.getSearchNews)))
  );


  constructor(private store: Store) { }


  searchSubmit(event: Event): void{
    event.preventDefault()
    this.searchData$.next(this.search?.value)
    this.showInfo = true
  }

  doRefresh(event) {
    setTimeout(() => {
      this.search.reset();
      this.showInfo = false
      this.searchData$.next('')
      event.target.complete();
    }, 500);
  }

}
