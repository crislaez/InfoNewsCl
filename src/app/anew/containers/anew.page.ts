import { Component, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, EMPTY } from 'rxjs';
import { catchError, startWith, switchMap, tap } from 'rxjs/operators';
import { fromNews } from 'src/app/shared/news';
import { errorImage, checkObjectLength } from '../../shared/shared/utils/utils';


@Component({
  selector: 'app-anew',
  template:`
  <ion-content [fullscreen]="true">
    <div class="container components-color">

      <ng-container *ngIf="(aNew$ | async) as aNew; else loader">
        <ng-container *ngIf="!(pending$ | async); else loader">
          <ng-container *ngIf="checkObjectLength(aNew)?.length > 0; else noData">

           <!-- HEADER  -->
            <div class="header fade-in-card" no-border>
              <ion-back-button defaultHref="home" class="text-color" [text]="''"></ion-back-button>
              <div class="header-container-empty" ></div>
              <h2 class="text-color">{{aNew?.title}}</h2>
            </div>

            <ion-card class="container-card margin-top-card fade-in-card">
              <img loading="lazy" [src]="aNew?.image" [alt]="aNew?.title" (error)="errorImage($event, placeholder)"/>

              <ion-card-header>
                <ion-card-title class="text-color">{{aNew?.title}}</ion-card-title>
              </ion-card-header>

              <ion-card-content class="text-color">
                <p>{{aNew?.description}}</p>
                <p>{{aNew?.author}} - {{aNew?.published_at | date:'MMM d, y'}}</p>
                <a [href]="aNew?.url" >ver</a>
              </ion-card-content>
            </ion-card>

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
  styleUrls: ['./anew.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnewPage  {
  errorImage = errorImage;
  checkObjectLength = checkObjectLength;
  placeholder = '../../../assets/images/image_not_found.png';
  reload$ = new EventEmitter();
  pending$: Observable<boolean> = this.store.pipe(select(fromNews.getPending));

  aNew$:Observable<any> = this.reload$.pipe(
    startWith(''),
    switchMap(() => this.route.params.pipe(
      switchMap(({newsName}) => this.route.queryParams.pipe(
        switchMap(({isNews}) => {
          if(isNews === 'true'){
            return this.store.pipe(select(fromNews.getNew(newsName))).pipe(
              tap(data => {
                if(!data) this.router.navigate(['/home'])
                return EMPTY
              })
            )
          }
          return this.store.pipe(select(fromNews.getSearchNew(newsName))).pipe(
            tap(data => {
              if(!data) this.router.navigate(['/home'])
              return EMPTY
            })
          )
        })
      ))
    ))
  );


  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    // this.aNew$.subscribe(data => console.log(data))
  }


  doRefresh(event) {
    setTimeout(() => {
      this.reload$.next('')
      event.target.complete();
    }, 500);
  }



}
