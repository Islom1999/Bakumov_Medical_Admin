import { Component, Input, OnInit } from '@angular/core';
import { RoleService } from '../../service/role.service';
import { IRole } from 'src/interfaces';

@Component({
  selector: 'app-role-info',
  templateUrl: './role-info.component.html',
  styleUrls: ['./role-info.component.scss']
})
export class RoleInfoComponent implements OnInit {
  @Input()
  id!: string;
  role!:IRole

  constructor(
    private _roleSrv: RoleService  
  ){}
 
  ngOnInit(): void {
    this._roleSrv.getById(this.id).subscribe((role) => {
      this.role = role;
    })
  }
}
