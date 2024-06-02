import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageDetailComponent } from './components/message-detail/message-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { canActivatePermission } from 'src/app/shared/guards/permission-guard';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { UploadImageDirective } from 'src/app/shared/directives/ng-image-upload.directive';
import { BaseModule } from 'src/app/shared/modules';

const router: Routes =  [
  {
    path: '',
    component: MessageListComponent
  },
  {
    path: 'add',
    component: MessageDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_create'] }
  },
  {
    path: 'update/:id',
    component: MessageDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_update'] }
  }
] 

@NgModule({
  declarations: [
    MessageListComponent,
    MessageDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router),
    UploadImageDirective,
    
    CKEditorModule,
    NzModalModule,
  ]
})
export class MessageModule { }
