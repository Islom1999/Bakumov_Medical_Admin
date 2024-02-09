import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../shared/services/permission.service';
import { NgxPermissionsService } from 'ngx-permissions';

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
  ){}

  ngOnInit(): void {
    this.permissions.getPermisssion().subscribe(permission => {
      this.permissionService.loadPermissions(permission);
    })
  }
}
