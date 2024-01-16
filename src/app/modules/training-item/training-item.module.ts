import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingItemListComponent } from './components/training-item-list/training-item-list.component';
import { TrainingItemDetailComponent } from './components/training-item-detail/training-item-detail.component';



@NgModule({
  declarations: [
    TrainingItemListComponent,
    TrainingItemDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TrainingItemModule { }
