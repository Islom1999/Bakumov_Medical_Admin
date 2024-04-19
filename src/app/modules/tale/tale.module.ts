import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaleListComponent } from './components/tale-list/tale-list.component';
import { TaleDetailComponent } from './components/tale-detail/tale-detail.component';
import { canActivatePermission } from 'src/app/shared/guards/permission-guard';
import { RouterModule, Routes } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { UploadImageDirective } from 'src/app/shared/directives/ng-image-upload.directive';
import { BaseModule } from 'src/app/shared/modules';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

const router: Routes =  [
  {
    path: '',
    component: TaleListComponent
  },
  {
    path: 'add',
    component: TaleDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_create'] }
  },
  {
    path: 'update/:id',
    component: TaleDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_update'] }
  }
] 

@NgModule({
  declarations: [
    TaleListComponent,
    TaleDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router),

    UploadImageDirective,
    NzModalModule,
    CKEditorModule,
  ]
})
export class TaleModule { }
