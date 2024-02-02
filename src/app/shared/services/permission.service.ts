import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from 'src/enumerations';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}
  
  getPermisssion(): Observable<Permission[]> {
    const url = `${this.apiUrl}/permission`;
    return this.http.get<Permission[]>(url);
  }
}
