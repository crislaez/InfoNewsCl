import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-root',
  template: `
  <ion-app >
    <!-- CABECERA  -->
    <ion-header no-border >
      <ion-toolbar mode="md|ios">
        <!-- <ion-button fill="clear" size="small" slot="start"  (click)="open()">
            <ion-menu-button class="text-color"></ion-menu-button>
        </ion-button> -->

        <ion-title class="text-color" >InfoNewsCl</ion-title>

        <!-- <div size="small" slot="end" class="div-clear"  >
        </div> -->
      </ion-toolbar>
    </ion-header>

    <!-- MENU LATERAL  -->
    <!-- <ion-menu side="start" menuId="first" contentId="main" class="components-color" >
      <ion-header>
        <ion-toolbar class="components-color">
          <ion-title class="text-color" >Menu</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-menu> -->

    <!-- RUTER  -->
    <ion-router-outlet id="main"></ion-router-outlet>

    <!-- TAB FOOTER  -->
    <ion-tabs >
      <ion-tab-bar slot="bottom">
        <ion-tab-button class="text-color" [routerLink]="['home']">
          <ion-icon name="home-outline"></ion-icon>
          <!-- <ion-label>Inicio</ion-label> -->
        </ion-tab-button>

        <ion-tab-button class="text-color" [routerLink]="['search']">
          <ion-icon name="search-outline"></ion-icon>
          <!-- <ion-label>Buscar</ion-label> -->
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>

  </ion-app>
  `,
  styleUrls: ['./root.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent {

  constructor(private menu: MenuController, private store: Store, private router: Router) { }


  open() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  redirectTo(passage: string): void{
    this.router.navigate(['/chapter/'+passage])
    this.menu.close('first')
  }

  openEnd() {
    this.menu.close();
  }

}
