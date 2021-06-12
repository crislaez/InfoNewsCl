import { Component, ChangeDetectionStrategy, EventEmitter, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';
import { fromNews, NewsActions, NewsService } from 'src/app/shared/news';
import { trackById, errorImage } from '../../shared/shared/utils/utils';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  template:`
    <ion-content [fullscreen]="true">
      <div class="container components-color">

       <!-- HEADER  -->
       <!-- <div class="header" no-border>
          <h1 class="text-color">Noticias</h1>
       </div> -->
       <div class="empty-header" no-border>
          <!-- <h1 class="text-color">Noticias</h1> -->
       </div>

        <ng-container *ngIf="(news$ | async) as news; else loader">
          <ng-container *ngIf="!(pending$ | async); else loader">
            <ng-container *ngIf="news?.length > 0; else noData">

              <ion-card class="container-card ion-activatable ripple-parent fade-in-card" *ngFor="let aNew of news; trackBy: trackById" [routerLink]="['/anew/'+aNew?.title]" [queryParams]="{isNews:true}">
                <img loading="lazy" [src]="aNew?.image" [alt]="aNew?.title" (error)="errorImage($event, placeholder)"/>
                <ion-card-header>
                  <!-- <ion-card-subtitle>Destination</ion-card-subtitle> -->
                  <ion-card-title class="text-color">{{aNew?.title}}</ion-card-title>
                </ion-card-header>
                <ion-card-content class="text-color">{{aNew?.published_at | date:'MMM d, y'}}</ion-card-content>

                <ion-ripple-effect></ion-ripple-effect>
              </ion-card>

              <ng-container *ngIf="(total$ | async) as total">
                <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event, total)">
                  <ion-infinite-scroll-content loadingSpinner="crescent" color="primary">
                  </ion-infinite-scroll-content>
                </ion-infinite-scroll>
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
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage  {
  errorImage = errorImage;
  trackById = trackById;
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll
  placeholder = '../../../assets/images/image_not_found.png';
  perPage: number = 25;
  reload$ = new EventEmitter();
  infiniteScroll$ = new EventEmitter();
  pending$: Observable<boolean> = this.store.pipe(select(fromNews.getPending));
  total$: Observable<number> = this.store.pipe(select(fromNews.getTotal));

  news$: Observable<any> = combineLatest([
    this.reload$.pipe(startWith('')),
    this.infiniteScroll$.pipe(startWith(25))
  ]).pipe(
    tap(([_, perPage]) => this.store.dispatch(NewsActions.loadNews({perPage: perPage.toString()}))),
    switchMap(() => this.store.pipe(select(fromNews.getNews)) ),
  );


  constructor(private store: Store) {
    // this.news$.subscribe(data => console.log(data))
  }


  doRefresh(event) {
    setTimeout(() => {
      this.reload$.next('')
      event.target.complete();
    }, 500);
  }

  loadData(event, total) {
    setTimeout(() => {
      this.perPage = this.perPage + 25;
      if(this.perPage > total){
        this.ionInfiniteScroll.disabled = true
        return
      }
      this.infiniteScroll$.next(this.perPage)
      event.target.complete();
    }, 500);
  }

  sliceImageUrl(imageUrl: string): string{
    return imageUrl?.split('?')[0] || ''
  }





}
