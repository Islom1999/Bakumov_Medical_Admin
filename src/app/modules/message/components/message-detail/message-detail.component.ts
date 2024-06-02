import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MessageService } from '../../service/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { IUser } from 'src/interfaces';
import { UserService } from 'src/app/modules/user/service/user.service';
import { IMessage } from 'src/interfaces/message';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent {
  loading = true;
  // gender: Gender[] = Object.values(Gender);
  user$ !: Observable<IUser[]>
  
  form: FormGroup = new FormGroup({});

  get id() {
    return this.route.snapshot.params['id'];
  }

  constructor(
    private _messagesSrv: MessageService,
    private _userSrv: UserService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
      userId: new FormControl('', []),
    });

    if (this.id) {
      this._messagesSrv.getById(this.id).subscribe((item) => {
        this.form.patchValue(item);
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
    this.user$ = this._userSrv._data
  }

  submit() {
    if (this.form.valid) {
      if (this.id) {
        this.update(this.id);
      } else {
        this.create();
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

  create() {
    const data:IMessage = {...this.form.value}
    if(!this.form.value.userId){
      delete data.userId
    }

    this._messagesSrv
      .create({ ...data })
      .pipe(
        catchError(({ error }) => {
          if (error?.statusCode == 409)
            this.nzMessageService.error(error?.message);
          return of();
        })
      )
      .subscribe(() => {
        this.nzMessageService.success('Create data');
        this.router.navigate(['/', 'message']);
      });
  }

  update(id: string) {
    const data:IMessage = {...this.form.value}
    if(!this.form.value.userId){
      delete data.userId
    }

    this._messagesSrv
      .update(id, { ...data })
      .pipe(
        catchError(({ error }) => {
          if (error?.statusCode == 409)
            this.nzMessageService.error(error?.message);
          return of();
        })
      )
      .subscribe(() => {
        this.nzMessageService.success('Update data');
        this.router.navigate(['/', 'message']);
      });
  }
}
