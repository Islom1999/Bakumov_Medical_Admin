import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ImageService } from '../../services/image.service';
import { tap } from 'rxjs';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzImageModule } from 'ng-zorro-antd/image';
import { UploadImageDirective } from '../../directives/ng-image-upload.directive';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  standalone: true,
  imports: [
    UploadImageDirective,
    NzImageModule,
    NzSpinModule,
    NzIconModule,
    NzButtonModule,
  ]
})
export class ImageUploadComponent {

  loadingImage = false;
  imgNotFound = '/assets/images/no-image.jpg'
  imgUrl = 'Error'

  @Input()
  image!:string 

  constructor(
    private nzMessageService: NzMessageService,
    private imageSrv: ImageService
  ) {}


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
          // this.disableBtn = false;
        }) 
      )
      .subscribe()
  }

  removeImage(){
      this.loadingImage = true;
      this.imgUrl = 'Error'
      this.image = ''
      this.loadingImage = false
      // this.disableBtn = true;
  }

  getImageUrl(url: string): string{
    return this.imageSrv.getImageUrl(url)
  }
}
