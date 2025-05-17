import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { configurations } from '../models/general.type';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private meta: Meta
  ) {
    this.baseUrl = `${environment.url}/settings`;
  }

  getConfigurqations(): Observable<{ data: configurations[] }>{
    return this.http.get<{ data: configurations[] }>(`${this.baseUrl}`);
  }

  updateConfigurations(data: any) {
    const endpoint: string = this.baseUrl + '/upd';
    return this.http.put(endpoint, data);
  }

  getRules(): Observable<{ data: (string | null)[] }>{
    return this.http.get<{ data: (string | null)[] }>(`${this.baseUrl}/rules`);
  }
}
