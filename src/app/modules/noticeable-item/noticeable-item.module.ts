import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeableItemListComponent } from './components/noticeable-item-list/noticeable-item-list.component';
import { NoticeableItemDetailComponent } from './components/noticeable-item-detail/noticeable-item-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from 'src/app/shared/modules';
import { UploadImageDirective } from 'src/app/shared/directives/ng-image-upload.directive';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzModalModule } from 'ng-zorro-antd/modal';

const router: Routes =  [
  {
    path: '',
    component: NoticeableItemListComponent
  },
  {
    path: 'add',
    component: NoticeableItemDetailComponent
  },
  {
    path: 'update/:id',
    component: NoticeableItemDetailComponent
  }
] 

@NgModule({
  declarations: [
    NoticeableItemListComponent,
    NoticeableItemDetailComponent
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
export class NoticeableItemModule { }
