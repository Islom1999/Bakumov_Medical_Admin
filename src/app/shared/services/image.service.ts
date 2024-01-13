import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  apiUrl = `${environment.apiUrl}/image`;

  constructor(private http: HttpClient) { }

  uploadImage(image: File): Observable<{ url: string, filename:string}> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<{ url: string, filename:string}>(`${this.apiUrl}/upload`, formData);
  }

  getImageUrl(imageName: string): string {
    return `${this.apiUrl}/${imageName}`;
  }
}
