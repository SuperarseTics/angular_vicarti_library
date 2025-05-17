import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { bookListFilters, books } from '../models/general.type';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private meta: Meta
  ) {
    this.baseUrl = `${environment.url}/books`;
  }

  getBookList(filters: bookListFilters): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/catalog`, {
      params: {
        page: filters.page.toString(),
        size: filters.size.toString(),
        order: filters.order.toString(),
        sort: filters.sort.toString(),
        f_category: filters.f_category.toString(),
        f_author: filters.f_author.toString(),
        f_title: filters.f_title.toString().trim(),
        f_publication: filters.f_publication.toString(),
      }
    });
  }

  downloadBooks(filters: bookListFilters): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download`, {
      params: {
        page: filters.page.toString(),
        size: filters.size.toString(),
        order: filters.order.toString(),
        sort: filters.sort.toString(),
        f_category: filters.f_category.toString(),
        f_author: filters.f_author.toString(),
        f_title: filters.f_title.toString().trim(),
        f_publication: filters.f_publication.toString(),
      },
      responseType: 'blob'
    });
  }

  getBooksFilters(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/filter`);
  }

  getBook(code: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`, {
      params: {
        code: code
      }
    });
  }

  createBook(book: books): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('category_id', book.category.toString());
    formData.append('code', book.code);
    formData.append('title', book.title);
    formData.append('cover', book.cover);
    formData.append('author', book.author);
    formData.append('edition', book.edition);
    formData.append('publication', book.publication.toString());
    formData.append('synopsis', book.synopsis);
    formData.append('stock', book.stock.toString());
    formData.append('status', book.status_boolean ? '1' : '0');
    return this.http.post<any>(`${this.baseUrl}`, formData);
  }

  updateBook(book: books): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('category_id', book.category.toString());
    if(book.id) formData.append('id', book.id.toString());
    formData.append('code', book.code);
    if(book.status) formData.append('status', book.status);
    formData.append('title', book.title);
    if(book.cover) formData.append('cover', book.cover);
    formData.append('author', book.author);
    formData.append('publication', book.publication.toString());
    formData.append('edition', book.edition);
    formData.append('synopsis', book.synopsis);
    formData.append('stock', book.stock.toString());
    formData.append('status', book.status_boolean ? '1' : '0');
    return this.http.post<any>(`${this.baseUrl}/upd`, formData);
  }

  deleteBook(code: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${code}`);
  }
}
