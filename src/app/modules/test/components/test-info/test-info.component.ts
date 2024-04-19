import { Component, Input } from '@angular/core';
import { ITest } from 'src/interfaces';
import { TestAnswerService, TestService } from '../../service/test.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { TestAnswerDetailComponent } from '../test-answer-detail/test-answer-detail.component';

@Component({
  selector: 'app-test-info',
  templateUrl: './test-info.component.html',
  styleUrls: ['./test-info.component.scss']
})
export class TestInfoComponent {
  @Input()
  id!: string;
  test!:ITest

  constructor(
    private _service: TestService,
    private _serviceChild: TestAnswerService,
    private _messageSrv: NzMessageService,
    private _drawerService: NzDrawerService,
  ){}

  ngOnInit(): void {
    this._service.getById(this.id).subscribe(data => {
      this.test = data
    })
  }

  delete(id: string | undefined): void {
    if(!id) return
    this._serviceChild.delete(id).subscribe((data) => {
        this._messageSrv.error('delete')
    })
  }

  open(id?:string): void {
    this._drawerService.create<TestAnswerDetailComponent, { id?: string, parent_id?: string }, string>({
      nzTitle: 'Foydalanuvchi ma\'lumotlari',
      nzContent: TestAnswerDetailComponent,
      nzSize: 'large',
      nzContentParams: {
        id: id,
        parent_id: this.id
      }
    });
  }
}
