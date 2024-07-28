import { Component, Input } from '@angular/core';
import { OrderServiceV2 } from '../../service/order.service';
import { IOrderV2 } from 'src/interfaces/order';

@Component({
  selector: 'app-order-detail-v2',
  templateUrl: './order-detail-v2.component.html',
  styleUrls: ['./order-detail-v2.component.scss']
})
export class OrderDetailV2Component  {
  @Input()
  id!:string

  order!:IOrderV2

  constructor(
    private _service: OrderServiceV2  
  ){}

  ngOnInit(): void {
    this._service.getById(this.id).subscribe(data => {
      this.order = data
    })
  }
}
