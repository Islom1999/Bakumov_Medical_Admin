import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: 'role',
        loadChildren: () => import('../modules/index').then((modules) => modules.RoleModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('../modules/index').then((modules) => modules.AdminModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule {}
