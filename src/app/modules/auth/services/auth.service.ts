import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { authUser, userData } from '../models/auth.type';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string;

  private _authUser: BehaviorSubject<authUser | null> = new BehaviorSubject<authUser | null>(null);

  constructor(
    private http: HttpClient,
  ) {
    this.baseUrl = `${environment.url}`;
  }

  set authUser(user: authUser | null){
    this._authUser.next(user);
  }

  get authUser$(): Observable<authUser | null>{
    return this._authUser.asObservable();
  }

  public getToken(): string {
    const user = this._authUser.getValue();
    return user ? user.token : '';
  }

  public getUser(): userData | null {
    const user = this._authUser.getValue();
    return user ? user.user : null;
  }

  login(login: { email: string, password: string }): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('email', login.email);
    formData.append('password', login.password);
    return this.http.post<any>(`${this.baseUrl}/login`, formData);
  }

  logout(): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/logout`);
  }
}
