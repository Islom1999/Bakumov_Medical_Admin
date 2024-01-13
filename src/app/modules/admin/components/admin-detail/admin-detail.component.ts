import { Component } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { AdminService } from '../../service/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Permission } from 'src/enumerations';
import { IRole } from 'src/interfaces';
import { RoleService } from 'src/app/modules/role/service/role.service';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.scss']
})
export class AdminDetailComponent {
  roles!:IRole[]
  loading = true;
  disableBtn = true;

  form: FormGroup = new FormGroup({});

  get id() {
    return this.route.snapshot.params['id']
  }

  constructor(
    private _roleSrv: RoleService,
    private _adminSrv: AdminService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.minLength(6)]),
      phone: new FormControl('', [Validators.required]),
      adminRoleId: new FormControl('', [Validators.required]),
    }); 

    if(this.id){
      this._adminSrv.getById(this.id).subscribe((role) => {
        this.form.patchValue(role);
        this.disableBtn = false
        this.loading = false
      })
    }else{
      this.loading = false
      this.disableBtn = false
    }   
    this._roleSrv._data.subscribe((role) => {
      this.roles = role;
    })
  }

  submit(){
    if(this.form.valid){
      this.disableBtn = true
      if(this.id){
        this.update(this.id)
      }else{
        this.create()
      }
      
    }else{
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  create(){
    this._adminSrv.create(this.form.value)
    .pipe(
      catchError( ({error}) => {
        if(error?.statusCode == 409)
          this.nzMessageService.error(error?.message)
        this.disableBtn = false
        return of()
      } )
    )
    .subscribe(() => {
      this.nzMessageService.success('Create data')
      this.router.navigate(['/', 'admin'])
    })
  }

  update(id:string){
    this._adminSrv.update(id, this.form.value)
    .pipe(
      catchError( ({error}) => {
        if(error?.statusCode == 409)
          this.nzMessageService.error(error?.message)
        this.disableBtn = false
        return of()
      } )
    )
    .subscribe(() => {
      this.nzMessageService.success('Update data')
      this.router.navigate(['/', 'admin'])
    })
  }
}
