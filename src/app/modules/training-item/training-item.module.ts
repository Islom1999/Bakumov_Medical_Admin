import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingItemListComponent } from './components/training-item-list/training-item-list.component';
import { TrainingItemDetailComponent } from './components/training-item-detail/training-item-detail.component';
import { BaseModule } from 'src/app/shared/modules';
import { RouterModule, Routes } from '@angular/router';
import { UploadImageDirective } from 'src/app/shared/directives/ng-image-upload.directive';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { canActivatePermission } from 'src/app/shared/guards/permission-guard';

const router: Routes =  [
  {
    path: '',
    component: TrainingItemListComponent
  },
  {
    path: 'add',
    component: TrainingItemDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_create'] }
  },
  {
    path: 'update/:id',
    component: TrainingItemDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_update'] }
  }
] 

@NgModule({
  declarations: [
    TrainingItemListComponent,
    TrainingItemDetailComponent
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
export class TrainingItemModule { }
