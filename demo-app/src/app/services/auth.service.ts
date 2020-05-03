import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BACKEND_URL = 'api';

  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  login(userData: any) {
    return this.http.post<any>(`${this.BACKEND_URL}/users`, userData).pipe(map(user => {
      if (user && user.isAdmin && user.token) {
        const adminInfo = {
          ...user,
          timeStamp: new Date()
        };
        localStorage.setItem('adminInfo', JSON.stringify(adminInfo));
        this.isLoggedIn.next(true);
      }
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('adminInfo');
    this.isLoggedIn.next(false);
  }
}
