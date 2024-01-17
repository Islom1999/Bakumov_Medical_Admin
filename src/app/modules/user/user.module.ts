import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { BaseModule } from 'src/app/shared/modules';
import { RouterModule, Routes } from '@angular/router';

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
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router)
  ]
})
export class UserModule { }
