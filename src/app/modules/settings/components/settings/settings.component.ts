import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../service/settings.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISettings, SettingStatus } from 'src/interfaces';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  loading = true;
  otpType: SettingStatus[] = Object.values(SettingStatus);
  
  constructor(
    private _settingSrv: SettingsService,
    private nzMessageService: NzMessageService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      is_google: new FormControl('', [Validators.required]),
      is_otp: new FormControl('', [Validators.required]),
      is_payme: new FormControl(true, [Validators.required]),
      is_click: new FormControl(true, [Validators.required]),
      is_service: new FormControl(true, [Validators.required]),
    });

    this._settingSrv.getSettings().subscribe((item) => {
      this.form.patchValue(item);
      this.loading = false
    });

  }

  submit() {
    if (this.form.valid) {
      this.setSettings(this.form.value)
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  setSettings(data: ISettings){
    this._settingSrv.setSettings(data).pipe(
      catchError(({ error }) => {
          this.nzMessageService.error(error?.message);
        return of();
      })
    )
    .subscribe(() => {
      this.nzMessageService.success('Malumotlar yangilandi');
      this.router.navigate(['/', 'settings']);
    });
  }

}
