import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of, switchMap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { IPossible } from 'src/interfaces';
import { PossibleService } from '../../service/possible.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { Breadcrumb } from 'src/types/breadcrump';

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

  constructor(_possibleSrv: PossibleService, _messageSrv: NzMessageService, private _breadcrumbSrv: BreadcrumbsService) {
    super(_possibleSrv, _messageSrv, _breadcrumbSrv);
  }

  override breadcrumb: Breadcrumb = {
    header: "Xavfsiz bo'limlar", 
    label: "Xavfsiz bo'limlar ro'yhati", 
    url: '/possible'
  };

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
