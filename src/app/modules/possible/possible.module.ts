import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PossibleListComponent } from './components/possible-list/possible-list.component';
import { PossibleDetailComponent } from './components/possible-detail/possible-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from 'src/app/shared/modules';
import { NgxPermissionsModule } from 'ngx-permissions';
import { canActivatePermission } from 'src/app/shared/guards/permission-guard';

const router: Routes =  [
  {
    path: '',
    component: PossibleListComponent
  },
  {
    path: 'add',
    component: PossibleDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_create'] }
  },
  {
    path: 'update/:id',
    component: PossibleDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_update'] }
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
