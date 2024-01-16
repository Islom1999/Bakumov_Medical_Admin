import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of, switchMap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { IPossible } from 'src/interfaces';
import { PossibleService } from '../../service/possible.service';

@Component({
  selector: 'app-possible-list',
  templateUrl: './possible-list.component.html',
  styleUrls: ['./possible-list.component.scss']
})
export class PossibleListComponent extends BaseComponentList<IPossible> {
  possible$: Observable<IPossible[]> = of([]);
  
  // Serch variables
  searchValue = '';
  visible = false;

  constructor(_possibleSrv: PossibleService, _messageSrv: NzMessageService) {
    super(_possibleSrv, _messageSrv);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.possible$ = this.data$;
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.possible$ = this.possible$.pipe(
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
