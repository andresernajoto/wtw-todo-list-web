import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from '../models/list';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ListService {
  private apiUrl = `${environment.apiUrl}/v1/List`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<List[]> {
    return this.http.get<List[]>(this.apiUrl);
  }

  getById(id: number): Observable<List> {
    return this.http.get<List>(`${this.apiUrl}/${id}`);
  }

  create(listName: string): Observable<List> {
    const payload = { name: listName };

    return this.http.post<List>(this.apiUrl, payload);
  }

  update(id: number, list: List): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, list);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
