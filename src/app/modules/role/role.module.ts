import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from './components/role-list/role-list.component';
import { RoleDetailComponent } from './components/role-detail/role-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from 'src/app/shared/modules';
import { FormsModule } from '@angular/forms';
import { RoleInfoComponent } from './components/role-info/role-info.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { canActivatePermission } from 'src/app/shared/guards/permission-guard';

const router: Routes =  [
  {
    path: '',
    component: RoleListComponent
  },
  {
    path: 'add',
    component: RoleDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['role_create'] }
  },
  {
    path: 'update/:id',
    component: RoleDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['role_update'] }
  }
] 

@NgModule({
  declarations: [
    RoleListComponent,
    RoleDetailComponent,
    RoleInfoComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router),

    NzDrawerModule
  ]
})
export class RoleModule{}
