import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { BaseModule } from 'src/app/shared/modules';
import { RouterModule, Routes } from '@angular/router';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { UploadImageDirective } from 'src/app/shared/directives/ng-image-upload.directive';


const router: Routes =  [
  {
    path: '',
    component: ArticleListComponent
  },
  {
    path: 'add',
    component: ArticleDetailComponent
  },
  {
    path: 'update/:id',
    component: ArticleDetailComponent
  }
] 

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router),
    CKEditorModule,
    UploadImageDirective,
    
    NzModalModule
  ]
})
export class ArticleModule { }
