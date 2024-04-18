import { Component } from '@angular/core';
import { BaseImageUpload } from 'src/app/base/components/base-upload-image';
import { ToolsService } from '../../service/tools.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/shared/services/image.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITools } from 'src/interfaces';
import { Observable, catchError, of } from 'rxjs';
import { ToolsType } from 'src/enumerations/toolsType';
import { RoleType } from 'src/enumerations';
import { ServiceType } from 'src/enumerations/serviceType';

@Component({
  selector: 'app-tools-detail',
  templateUrl: './tools-detail.component.html',
  styleUrls: ['./tools-detail.component.scss']
})
export class ToolsDetailComponent extends BaseImageUpload {
  toolsType: ToolsType[] = Object.values(ToolsType);
  roleType: RoleType[] = Object.values(RoleType);
  serviceType: ServiceType[] = Object.values(ServiceType);
  noticeable: Observable<ITools[]> = of([]);
  loading = true;
  form: FormGroup = new FormGroup({});
  listOfSelectedValue = []
  
  get id() {
    return this.route.snapshot.params['id'];
  }
  
  constructor(
    private _toolsSrv: ToolsService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
    imageSrv: ImageService
  ) {
    super(imageSrv)
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      toolsType: new FormControl('', [Validators.required]),
      roleType: new FormControl('', [Validators.required]),
      serviceType: new FormControl('', [Validators.required]),
    });

    if (this.id) {
      this._toolsSrv.getById(this.id).subscribe((item) => {
        this.form.patchValue(item);
        this.disableBtn = false;
        this.loading = false
        this.imgUrl = this.getImageUrl(item.icon)
        this.image = item.icon
        this.loadingImage = false
      });
    } else {
      this.loading = false
      this.loadingImage = false;
      this.disableBtn = true;
    }
  }

  submit() {
    if (this.form.valid) {
      this.disableBtn = true;
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
    this._toolsSrv
      .create({...this.form.value, icon: this.image})
      .pipe(
        catchError(({ error }) => {
          if (error?.statusCode == 409)
            this.nzMessageService.error(error?.message);
          this.disableBtn = false;
          return of();
        })
      )
      .subscribe(() => {
        this.nzMessageService.success('Create data');
        this.router.navigate(['/', 'tools']);
      });
  }

  update(id: string) {
    const {name, roleType, serviceType} = this.form.value
    this._toolsSrv
      .update(id, {
        name, 
        roleType, 
        icon: this.image,
        serviceType
      })
      .pipe(
        catchError(({ error }) => {
          if (error?.statusCode == 409)
            this.nzMessageService.error(error?.message);
          this.disableBtn = false;
          return of();
        })
      )
      .subscribe(() => {
        this.nzMessageService.success('Update data');
        this.router.navigate(['/', 'tools']);
      });
  }
}
