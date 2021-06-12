import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnewPage } from './containers/anew.page';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path:':newsName',
        component: AnewPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnewPageRoutingModule {}
