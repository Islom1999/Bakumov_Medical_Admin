import { Component, Inject, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { OrderService } from '../../service/order.service';
import { IOrder } from 'src/interfaces/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @Input()
  id!:string

  order!:IOrder

  constructor(
    private _service: OrderService  
  ){}

  ngOnInit(): void {
    this._service.getById(this.id).subscribe(data => {
      this.order = data
    })
  }
}
