import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { filtersCategory } from '../models/general.type';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private meta: Meta
  ) {
    this.baseUrl = `${environment.url}/bookings`;
  }

  makeReservation(data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/reserve`, data);
  }

  showReservation(code: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`, {
      params: {
        code: code
      }
    });
  }

  makeDelivery(data: { booking_code: string }): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/delivery`, data);
  }

  makeGiveBack(data: { booking_code: string }): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/giveback`, data);
  }

  historyList(filter: filtersCategory): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/record`, {
      params: {
        page: filter.page,
        size: filter.size,
        order: filter.order,
        sort: filter.sort,
      }
    });
  }
}
