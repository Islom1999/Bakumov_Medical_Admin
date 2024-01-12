import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Permission } from 'src/enumerations';
import { RoleService } from '../../service/role.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss'],
})
export class RoleDetailComponent implements OnInit {
  permissionsTypes: Permission[] = Object.values(Permission);
  listOfSelectedValue = [];
  loading = false;

  form: FormGroup = new FormGroup({});

  get id() {
    return this.route.snapshot.params['id']
  }

  constructor(
    private _roleSrv: RoleService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      permission: new FormControl('', [Validators.required]),
    }); 
    if(this.id){
      this._roleSrv.getById(this.id).subscribe((role) => {
        this.form.patchValue(role);
      })
      setTimeout(() => this.loading = true, 100)
    }else{
      setTimeout(() => this.loading = true, 100)
    }   
  }

  submit(){
    if(this.form.valid){
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
    this._roleSrv.create(this.form.value).subscribe(() => {
      this.nzMessageService.success('Create data')
      this.router.navigate(['/', 'role'])
    })
  }

  update(id:string){
    this._roleSrv.update(id, this.form.value).subscribe(() => {
      this.nzMessageService.success('Update data')
      this.router.navigate(['/', 'role'])
    })
  }

  

}
