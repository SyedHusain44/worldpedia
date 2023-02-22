import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorldpediaComponent } from './worldpedia/worldpedia.component';

const routes: Routes = [
  {path:'',component:WorldpediaComponent},

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
