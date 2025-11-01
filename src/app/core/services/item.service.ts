import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private apiUrl = `${environment.apiUrl}/v1/Item`;

  constructor(private http: HttpClient) {}

  getAllFromList(listId: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/list/${listId}`);
  }

  getById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  create(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
