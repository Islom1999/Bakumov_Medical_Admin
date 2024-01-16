import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { ITools } from 'src/interfaces';
import { ToolsService } from '../../service/tools.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BaseComponentList } from 'src/app/base/components/base-list';

@Component({
  selector: 'app-tools-list',
  templateUrl: './tools-list.component.html',
  styleUrls: ['./tools-list.component.scss']
})
export class ToolsListComponent extends BaseComponentList<ITools> implements OnInit {
  tools$: Observable<ITools[]> = of([]);
  // toolsType: ToolsType[] = Object.values(ToolsType);
  // toolsParam!:ToolsType
  
  // Serch variables
  searchValue = '';
  visible = false;

  constructor(
    private _toolsSrv: ToolsService,
    private _messageSrv: NzMessageService,
  ){
    super(_toolsSrv, _messageSrv);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.tools$ = this.data$.pipe(
      tap(() => {
        this.loading = false
      }) 
    )
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.tools$ = this.tools$.pipe(
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

  // filterParent(toolsParam: ToolsType){
  //   if(toolsParam){
  //     let params = new HttpParams().set('type', toolsParam);
  //     this.tools$ = this._toolsSrv.getAll(params);
  //   }else{
  //     this.tools$ = this._toolsSrv.getAll();
  //   }    
  // }
}