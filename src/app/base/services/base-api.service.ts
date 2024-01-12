import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { IPagination } from 'src/interfaces';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseApiService<T> {
  private _dataSubject = new BehaviorSubject<T[]>([]);
  readonly _data: Observable<T[]> = this._dataSubject.asObservable();

  constructor(protected http: HttpClient, protected apiUrl: string) {
    this.loadAll()
  }

  loadAll(params?: HttpParams) {
    this.http.get<T[]>(`${this.apiUrl}`, { params })
      .pipe(
        tap(data => this._dataSubject.next(data))
      )
      .subscribe();
  }

  getAll(params?: HttpParams): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}`, { params });
  }

  getAllPanination(params?: HttpParams): Observable<IPagination<T[]>> {
    return this.http.get<IPagination<T[]>>(`${this.apiUrl}/pagination`, {
      params,
    });
  }

  getById(id: string | undefined): Observable<T> {
    if(!id) return of()
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  create(data: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}`, data).pipe(
      tap(() => {
        this.loadAll()
      })
    );
  }

  update(id: string, data: T): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${id}`, data).pipe(
      tap(() => {
        this.loadAll()
      })
    );
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.loadAll()
      })
    );
  }
}
