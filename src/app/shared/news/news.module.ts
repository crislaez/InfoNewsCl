import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StoreModule} from '@ngrx/store';
import * as fromNews from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { NewsEffects } from './effects/news.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(fromNews.newsKey, fromNews.reducer),
    EffectsModule.forFeature([NewsEffects])
  ]
})
export class NewsModule {}
