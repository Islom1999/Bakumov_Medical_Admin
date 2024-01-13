import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleType } from 'src/enumerations/roleType';
import { ArticleService } from '../../service/article.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ImageService } from 'src/app/shared/services/image.service';


@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent {
  roleTypes: RoleType[] = Object.values(RoleType);
  public Editor = ClassicEditor;

  loading = true;
  disableBtn = true;
  
  form: FormGroup = new FormGroup({});
  
  get id() {
    return this.route.snapshot.params['id'];
  }
  
  // image variables
  loadingImage = true;
  imgNotFound = '/assets/images/no-image.jpg'
  imgUrl = 'Error'
  image!:string 

  constructor(
    private _articleSrv: ArticleService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
    private imageSrv: ImageService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      descr: new FormControl('', [Validators.required]),
      roleType: new FormControl('', [Validators.required]),
    });

    if (this.id) {
      this._articleSrv.getById(this.id).subscribe((item) => {
        this.form.patchValue(item);
        this.disableBtn = false;
        this.loading = false
        this.imgUrl = this.getImageUrl(item.image)
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
    this._articleSrv
      .create({...this.form.value, image: this.image})
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
        this.router.navigate(['/', 'article']);
      });
  }

  update(id: string) {
    this._articleSrv
      .update(id, {...this.form.value, image: this.image})
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
        this.router.navigate(['/', 'article']);
      });
  }

  // Image loading

  openUpload(fileInput: HTMLInputElement){
    fileInput.click()
  }

  uploadImage(event: File){
    this.loadingImage = true;
    this.imageSrv.uploadImage(event)
      .pipe(
        tap((image) => {
          this.imgUrl = image.url
          this.image = image.filename
          this.loadingImage = false;
          this.disableBtn = false;
        }) 
      )
      .subscribe()
  }

  removeImage(){
      this.loadingImage = true;
      this.imgUrl = 'Error'
      this.image = ''
      this.loadingImage = false
      this.disableBtn = true;
  }

  getImageUrl(url: string): string{
    return this.imageSrv.getImageUrl(url)
  }

}
