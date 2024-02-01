import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/modules/admin/service/admin.service';
import { IAdmin } from 'src/interfaces';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  admin!: IAdmin

  constructor(
    private _adminSrv: AdminService
  ){}

  ngOnInit(): void {
    this._adminSrv.getByme().subscribe(admin => {
      this.admin = admin
    })
  }

}
