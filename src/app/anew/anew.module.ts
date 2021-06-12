import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AnewPageRoutingModule } from './anew-routing.module';
import { AnewPage } from './containers/anew.page';
import { NewsModule } from '../shared/news/news.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsModule,
    AnewPageRoutingModule
  ],
  declarations: [AnewPage]
})
export class AnewPageModule {}
