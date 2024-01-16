import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { IPossible, IPossibleItem } from 'src/interfaces';
import { PossibleItemService } from '../../service/possible-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PossibleService } from 'src/app/modules/possible/service/possible.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-possible-item-list',
  templateUrl: './possible-item-list.component.html',
  styleUrls: ['./possible-item-list.component.scss'],
})
export class PossibleItemListComponent extends BaseComponentList<IPossibleItem> implements OnInit{
  possibleItem$: Observable<IPossibleItem[]> = of([]);
  possible: Observable<IPossible[]> = of([]);
  possibleId!: string;

  // Serch variables
  searchValue = '';
  visible = false;

  constructor(
    private _possibleItemSrv: PossibleItemService,
    private _possibleSrv: PossibleService,
    private _messageSrv: NzMessageService,
  ) {
    super(_possibleItemSrv, _messageSrv);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.possibleItem$ = this.data$.pipe(
      tap(() => {
        this.loading = false;
      })
    );
    this.possible = this._possibleSrv.getAll();
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.possibleItem$ = this.possibleItem$.pipe(
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
      this.possibleItem$ = this._possibleItemSrv.getAll(params);
    } else {
      this.possibleItem$ = this._possibleItemSrv.getAll();
    }
  }
}
