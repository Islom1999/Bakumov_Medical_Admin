import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { AdminDetailComponent } from './components/admin-detail/admin-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from 'src/app/shared/modules';
import { AdminInfoComponent } from './components/admin-info/admin-info.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

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
    AdminDetailComponent,
    AdminInfoComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router),

    NzDrawerModule
  ]
})
export class AdminModule { }
