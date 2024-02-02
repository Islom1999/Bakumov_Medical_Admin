import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PossibleItemDetailComponent } from './components/possible-item-detail/possible-item-detail.component';
import { PossibleItemListComponent } from './components/possible-item-list/possible-item-list.component';
import { BaseModule } from 'src/app/shared/modules';
import { RouterModule, Routes } from '@angular/router';
import { UploadImageDirective } from 'src/app/shared/directives/ng-image-upload.directive';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { canActivatePermission } from 'src/app/shared/guards/permission-guard';

const router: Routes =  [
  {
    path: '',
    component: PossibleItemListComponent
  },
  {
    path: 'add',
    component: PossibleItemDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_create'] }
  },
  {
    path: 'update/:id',
    component: PossibleItemDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_update'] }
  }
] 

@NgModule({
  declarations: [
    PossibleItemDetailComponent,
    PossibleItemListComponent
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
export class PossibleItemModule { }
