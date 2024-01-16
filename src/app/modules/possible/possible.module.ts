import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PossibleListComponent } from './components/possible-list/possible-list.component';
import { PossibleDetailComponent } from './components/possible-detail/possible-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from 'src/app/shared/modules';

const router: Routes =  [
  {
    path: '',
    component: PossibleListComponent
  },
  {
    path: 'add',
    component: PossibleDetailComponent
  },
  {
    path: 'update/:id',
    component: PossibleDetailComponent
  }
] 

@NgModule({
  declarations: [
    PossibleListComponent,
    PossibleDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,

    RouterModule.forChild(router)
  ]
})
export class PossibleModule { }
