import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { AdminDetailComponent } from './components/admin-detail/admin-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from 'src/app/shared/modules';

const router: Routes =  [
  {
    path: '',
    component: AdminListComponent
  },
  {
    path: 'add',
    component: AdminDetailComponent
  },
  {
    path: 'update/:id',
    component: AdminDetailComponent
  }
] 

@NgModule({
  declarations: [
    AdminListComponent,
    AdminDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router)
  ]
})
export class AdminModule { }
