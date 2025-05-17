import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { bookListFilters, filtersCategory } from '../models/general.type';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private meta: Meta
  ) {
    this.baseUrl = `${environment.url}/categories`;
  }

  getCategories(filter: filtersCategory): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/catalog`, {
      params: {
        page: filter.page,
        size: filter.size,
        order: filter.order,
        sort: filter.sort,
      }
    });
  }

  createCategorie(categorie: { title: string, status: boolean }): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('title', categorie.title);
    formData.append('status', categorie.status ? '1' : '0');
    return this.http.post<any>(`${this.baseUrl}`, formData);
  }

  updateCategorie(categorie: { id: number, title: string, status: boolean }): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('title', categorie.title);
    formData.append('id', categorie.id.toString());
    formData.append('status', categorie.status ? '1' : '0');
    return this.http.post<any>(`${this.baseUrl}/upd`, formData);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
