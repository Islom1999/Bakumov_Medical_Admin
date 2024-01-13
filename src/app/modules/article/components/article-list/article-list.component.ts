import { Component, OnInit } from '@angular/core';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { IArticle } from 'src/interfaces';
import { ArticleService } from '../../service/article.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent extends BaseComponentList<IArticle> implements OnInit {
  articles$: Observable<IArticle[]> = of([]);
  
  // Serch variables
  searchValue = '';
  visible = false;

  constructor(
    private _articleSrv: ArticleService,
    private _messageSrv: NzMessageService  
  ){
    super(_articleSrv, _messageSrv);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.articles$ = this.data$;
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.articles$ = this.articles$.pipe(
      switchMap((item) =>
        of(
          item.filter((article) =>
            article.title
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }

}
