import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../shared/services/permission.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {
  isCollapsed = false;

  constructor(
    private permissions: PermissionService,
    private permissionService: NgxPermissionsService,  
    private authSrv: AuthService,  
  ){}

  ngOnInit(): void {
    this.permissions.getPermisssion().subscribe(permission => {
      this.permissionService.loadPermissions(permission);
    })
  }

  logout(){
    return this.authSrv.logout()
  }
}
