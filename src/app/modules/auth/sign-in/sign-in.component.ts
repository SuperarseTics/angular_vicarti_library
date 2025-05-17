import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantService } from '../../providers/constant.service';
import { authUser } from '../models/auth.type';
import { AuthService } from '../services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public login: { email: string, password: string } = { email: '', password: '' };
  public alert: { type: "success" | "info" | "warning" | "error", content: string } = { type: 'info', content: '' };
  public loading: boolean = false;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
    private constantService: ConstantService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  restartAlert(): void {
    this.alert = { type: 'info', content: '' };
  }

  signIn(): void {
    if (this.loading) {
      return;
    }
    if (this.login.email === '' || this.login.password === '') {
      this.alert = { type: 'info', content: 'Ingrese correo eléctronico y contraseña' };
      return;
    }

    this.loading = true;
    this.authService.login(this.login)
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (res) => {
        this.saveUser(res.data);
      },
      (error) => {
        this.alert = { type: 'error', content: error.error.message };
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.router.navigate(['/general']);
      }
    )

    // this.saveUser();
  }

  saveUser(user: authUser): void {
    localStorage.removeItem(this.constantService.nameLocaleStorage);
    localStorage.setItem(this.constantService.nameLocaleStorage, JSON.stringify(user));
  }

}
