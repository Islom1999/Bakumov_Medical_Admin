import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from './components/role-list/role-list.component';
import { RoleDetailComponent } from './components/role-detail/role-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from 'src/app/shared/modules';
import { FormsModule } from '@angular/forms';

const router: Routes =  [
  {
    path: '',
    component: RoleListComponent
  },
  {
    path: 'add',
    component: RoleDetailComponent
  },
  {
    path: 'update/:id',
    component: RoleDetailComponent
  }
] 

@NgModule({
  declarations: [
    RoleListComponent,
    RoleDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router),
  ]
})
export class RoleModule{}
