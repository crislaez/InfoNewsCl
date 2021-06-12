import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './containers/home.page';
import { NewsModule } from '../shared/news/news.module';
import { SharedModule } from '../shared/shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NewsModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage
  ]
})
export class HomePageModule {}
