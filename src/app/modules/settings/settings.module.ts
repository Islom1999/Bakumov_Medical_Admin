import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings/settings.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from 'src/app/shared/modules';

const router: Routes =  [
  {
    path: '',
    component: SettingsComponent
  }
] 

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router),
  ]
})
export class SettingsModule { }
