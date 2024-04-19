import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VaccineDetailComponent } from './components/vaccine-detail/vaccine-detail.component';
import { VaccineListComponent } from './components/vaccine-list/vaccine-list.component';
import { RouterModule, Routes } from '@angular/router';
import { canActivatePermission } from 'src/app/shared/guards/permission-guard';
import { BaseModule } from 'src/app/shared/modules';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

const router: Routes =  [
  {
    path: '',
    component: VaccineListComponent
  },
  {
    path: 'add',
    component: VaccineDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_create'] }
  },
  {
    path: 'update/:id',
    component: VaccineDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_update'] }
  }
] 

@NgModule({
  declarations: [
    VaccineDetailComponent,
    VaccineListComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router),

    NzDatePickerModule,
  ]
})
export class VaccineModule { }
