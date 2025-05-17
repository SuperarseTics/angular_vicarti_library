import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeneralReport } from '../models/general.type';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private meta: Meta
  ) {
    this.baseUrl = `${environment.url}/dashboards`;
  }

  getReport(): Observable<GeneralReport>{
    return this.http.get<GeneralReport>(`${this.baseUrl}`);
  }
}
