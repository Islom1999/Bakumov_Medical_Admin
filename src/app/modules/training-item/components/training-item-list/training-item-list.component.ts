import { Component } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { ITraining, ITrainingItem } from 'src/interfaces';
import { TrainingItemService } from '../../service/training-item.service';
import { TrainingService } from 'src/app/modules/training/service/training.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-training-item-list',
  templateUrl: './training-item-list.component.html',
  styleUrls: ['./training-item-list.component.scss']
})
export class TrainingItemListComponent extends BaseComponentList<ITrainingItem> {
  trainingItem$: Observable<ITrainingItem[]> = of([]);
  training: Observable<ITraining[]> = of([]);
  trainingId!: string;

  // Serch variables
  searchValue = '';
  visible = false;

  constructor(
    private _trainingItemSrv: TrainingItemService,
    private _trainingSrv: TrainingService,
    private _messageSrv: NzMessageService,
  ) {
    super(_trainingItemSrv, _messageSrv);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.trainingItem$ = this.data$.pipe(
      tap(() => {
        this.loading = false;
      })
    );
    this.training = this._trainingSrv.getAll();
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.trainingItem$ = this.trainingItem$.pipe(
      switchMap((item) =>
        of(
          item.filter((elem) =>
            elem.name
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }

  filterParent(selectedId: string) {
    if (selectedId) {
      let params = new HttpParams().set('parent_id', selectedId.toString());
      this.trainingItem$ = this._trainingItemSrv.getAll(params);
    } else {
      this.trainingItem$ = this._trainingItemSrv.getAll();
    }
  }
}
