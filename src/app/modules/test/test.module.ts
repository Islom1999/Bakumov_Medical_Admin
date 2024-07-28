import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestListComponent } from './components/test-list/test-list.component';
import { TestDetailComponent } from './components/test-detail/test-detail.component';
import { TestInfoComponent } from './components/test-info/test-info.component';
import { TestAnswerDetailComponent } from './components/test-answer-detail/test-answer-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { canActivatePermission } from 'src/app/shared/guards/permission-guard';
import { BaseModule } from 'src/app/shared/modules';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTagModule } from 'ng-zorro-antd/tag';

const router: Routes =  [
  {
    path: '',
    component: TestListComponent
  },
  {
    path: 'add',
    component: TestDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_create'] }
  },
  {
    path: 'update/:id',
    component: TestDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_update'] }
  }
] 

@NgModule({
  declarations: [
    TestListComponent,
    TestDetailComponent,
    TestInfoComponent,
    TestAnswerDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router),

    NzDrawerModule,
    NzTagModule,
  ]
})
export class TestModule { }
