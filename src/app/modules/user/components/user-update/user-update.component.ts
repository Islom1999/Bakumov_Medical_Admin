import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleType } from 'src/enumerations';
import { UserService } from '../../service/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, of } from 'rxjs';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  @Input()
  id!: string;
  roleTypes: RoleType[] = Object.values(RoleType);
  loading = true;
  form: FormGroup = new FormGroup({});

  constructor(
    private userSrv: UserService,
    private nzMessageService: NzMessageService,
    private drawerService: NzDrawerService,
    private drawerRef: NzDrawerRef<string>
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      date_premium_active: new FormControl('', [Validators.required]),
      roleType: new FormControl('', [Validators.required]),
    });

    if (this.id) {
      this.userSrv.getById(this.id).subscribe((item) => {
        this.form.patchValue(item);
        this.loading = false
      });
    } else {
      this.loading = false
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.id) {
        this.update(this.id);
      }
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  update(id: string) {
    this.userSrv
      .update(id, {...this.form.value})
      .pipe(
        catchError(({ error }) => {
          if (error?.statusCode == 409)
            this.nzMessageService.error(error?.message);
          return of();
        })
      )
      .subscribe(() => {
        this.nzMessageService.success('Update data');
        this.drawerRef.close()
      });
  }

  back(){
    this.drawerRef.close()
  }
}
