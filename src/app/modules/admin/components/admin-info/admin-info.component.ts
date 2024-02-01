import { Component, Input, OnInit } from '@angular/core';
import { IAdmin } from 'src/interfaces';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.component.html',
  styleUrls: ['./admin-info.component.scss']
})
export class AdminInfoComponent implements OnInit {
  @Input()
  id!: string;
  admin!: IAdmin

  constructor(
    private _adminSrv: AdminService  
  ){}

  ngOnInit(): void {
    this._adminSrv.getById(this.id).subscribe((admin) => {
      this.admin = admin;
    })
  }
}
