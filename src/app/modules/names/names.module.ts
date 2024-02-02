import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NamesListComponent } from './components/names-list/names-list.component';
import { NamesDetailComponent } from './components/names-detail/names-detail.component';
import { BaseModule } from 'src/app/shared/modules';
import { RouterModule, Routes } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgxPermissionsModule } from 'ngx-permissions';
import { canActivatePermission } from 'src/app/shared/guards/permission-guard';

const router: Routes =  [
  {
    path: '',
    component: NamesListComponent
  },
  {
    path: 'add',
    component: NamesDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_create'] }
  },
  {
    path: 'update/:id',
    component: NamesDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_update'] }
  }
] 

@NgModule({
  declarations: [
    NamesListComponent,
    NamesDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router),

    CKEditorModule,
    NzModalModule,
  ]
})
export class NamesModule { }
