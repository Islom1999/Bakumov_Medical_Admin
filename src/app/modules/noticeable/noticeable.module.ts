import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeableListComponent } from './components/noticeable-list/noticeable-list.component';
import { NoticeableDetailComponent } from './components/noticeable-detail/noticeable-detail.component';
import { BaseModule } from 'src/app/shared/modules';
import { RouterModule, Routes } from '@angular/router';
import { UploadImageDirective } from 'src/app/shared/directives/ng-image-upload.directive';

const router: Routes =  [
  {
    path: '',
    component: NoticeableListComponent
  },
  {
    path: 'add',
    component: NoticeableDetailComponent
  },
  {
    path: 'update/:id',
    component: NoticeableDetailComponent
  }
] 


@NgModule({
  declarations: [
    NoticeableListComponent,
    NoticeableDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router),

    UploadImageDirective
  ]
})
export class NoticeableModule { }
