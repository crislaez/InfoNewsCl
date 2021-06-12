import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchPageRoutingModule } from './search-routing.module';
import { SearchPage } from './containers/search.page';
import { SharedModule } from '../shared/shared/shared.module';
import { NewsModule } from '../shared/news/news.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NewsModule,
    SearchPageRoutingModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
