import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { BaseModule } from 'src/app/shared/modules';
import { RouterModule, Routes } from '@angular/router';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

const router: Routes =  [
  {
    path: '',
    component: UserListComponent
  },
  // {
  //   path: 'add',
  //   component: UserDetailComponent
  // },
  // {
  //   path: 'update/:id',
  //   component: UserDetailComponent
  // }
] 

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserUpdateComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router),

    NzDrawerModule,
    NzTagModule,
    NzDatePickerModule,
  ]
})
export class UserModule { }
