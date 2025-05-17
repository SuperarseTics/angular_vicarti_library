import { Injectable } from '@angular/core';
import moment from 'moment';
import { dataChart } from '../general/models/general.type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  constructor(
    private router: Router,
  ) { }

  public nameLocaleStorage: string = 'userData';

  getErrorsBack(error: any) {
    if (error.error.message == 'Unauthenticated.') {
      localStorage.removeItem(this.nameLocaleStorage);
      this.router.navigate(['/auth/sign-in']);
      return;
    }
    let errorMessage: string = '';
    if (error.error.errors) {
      const keys = Object.keys(error.error.errors);
      keys.forEach(element => {
        errorMessage += '<br>»' + error.error.errors[element];
      });
    } else {
      if (error.error) {
        if (error.error.error) {
          errorMessage += '<br>»' + error.error.error;
        } else {
          errorMessage += '<br>»' + error.error.message;
        }

      } else {
        errorMessage += '<br>»' + error.message;
      }
    }
    return errorMessage;
  }

  formatDate(date: any, formatNormal: string = 'YYYY-MM-DD hh:mm:ss', format: string = 'DD/MM/YY hh:mm a'): string {
    let dateFormat: string = '';
    dateFormat = moment(date, formatNormal).locale('es').format(format).toString();
    return dateFormat;
  }
}
