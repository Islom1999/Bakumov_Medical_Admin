import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Observable, catchError, of } from 'rxjs';
import { IPossible } from 'src/interfaces';
import { PossibleItemService } from '../../service/possible-service.service';
import { PossibleService } from 'src/app/modules/possible/service/possible.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/shared/services/image.service';
import { BaseImageUpload } from 'src/app/base/components/base-upload-image';

@Component({
  selector: 'app-possible-item-detail',
  templateUrl: './possible-item-detail.component.html',
  styleUrls: ['./possible-item-detail.component.scss'],
})
export class PossibleItemDetailComponent extends BaseImageUpload {
  public Editor = ClassicEditor;
  possible: Observable<IPossible[]> = of([]);
  loading = true;
  form: FormGroup = new FormGroup({});

  get id() {
    return this.route.snapshot.params['id'];
  }

  constructor(
    private _possibleItemSrv: PossibleItemService,
    private _possibleSrv: PossibleService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
    imageSrv: ImageService
  ) {
    super(imageSrv);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      descr: new FormControl('', [Validators.required]),
      isPossible: new FormControl('', [Validators.required]),
      possibleId: new FormControl('', [Validators.required]),
    });

    if (this.id) {
      this._possibleItemSrv.getById(this.id).subscribe((item) => {
        this.form.patchValue(item);
        this.disableBtn = false;
        this.loading = false;
        this.imgUrl = this.getImageUrl(item.image);
        this.image = item.image;
        this.loadingImage = false;
      });
    } else {
      this.loading = false;
      this.loadingImage = false;
      this.disableBtn = true;
    }

    this.possible = this._possibleSrv.getAll();
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
    this._possibleItemSrv
      .create({ ...this.form.value, image: this.image })
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
        this.router.navigate(['/', 'possible-item']);
      });
  }

  update(id: string) {
    this._possibleItemSrv
      .update(id, { ...this.form.value, image: this.image })
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
        this.router.navigate(['/', 'possible-item']);
      });
  }
}
