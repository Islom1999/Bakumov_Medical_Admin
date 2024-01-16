import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsListComponent } from './components/tools-list/tools-list.component';
import { ToolsDetailComponent } from './components/tools-detail/tools-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from 'src/app/shared/modules';
import { UploadImageDirective } from 'src/app/shared/directives/ng-image-upload.directive';
import { NzModalModule } from 'ng-zorro-antd/modal';

const router: Routes =  [
  {
    path: '',
    component: ToolsListComponent
  },
  {
    path: 'add',
    component: ToolsDetailComponent
  },
  {
    path: 'update/:id',
    component: ToolsDetailComponent
  }
] 

@NgModule({
  declarations: [
    ToolsListComponent,
    ToolsDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router),

    UploadImageDirective,
    NzModalModule,
  ]
})
export class ToolsModule { }
