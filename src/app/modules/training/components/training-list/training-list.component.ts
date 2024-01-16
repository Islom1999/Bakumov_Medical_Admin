import { Component } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { ITraining } from 'src/interfaces';
import { TrainingService } from '../../service/training.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent extends BaseComponentList<ITraining> {
  training$: Observable<ITraining[]> = of([]);
  
  // Serch variables
  searchValue = '';
  visible = false;

  constructor(_trainingSrv: TrainingService, _messageSrv: NzMessageService) {
    super(_trainingSrv, _messageSrv);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.training$ = this.data$;
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.training$ = this.training$.pipe(
      switchMap((item) =>
        of(
          item.filter((data) =>
            data.name
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }
}
