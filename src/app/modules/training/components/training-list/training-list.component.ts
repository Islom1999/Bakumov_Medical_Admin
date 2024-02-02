import { Component } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { ITraining } from 'src/interfaces';
import { TrainingService } from '../../service/training.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { Breadcrumb } from 'src/types/breadcrump';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { NgxPermissionsService } from 'ngx-permissions';

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

  override breadcrumb: Breadcrumb = {
    header: "Mashqlar", 
    label: "Mashqlar ro'yhati", 
    url: '/training'
  };

  constructor(
    _trainingSrv: TrainingService, 
    _messageSrv: NzMessageService, 
    _breadcrumbSrv: BreadcrumbsService,
    private permissions: PermissionService,
    private permissionService: NgxPermissionsService, 
  ) {
    super(_trainingSrv, _messageSrv, _breadcrumbSrv, permissions, permissionService);
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
