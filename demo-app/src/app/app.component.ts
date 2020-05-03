import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demo-app';

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.checkForTokenValidity();
  }

  checkForTokenValidity() {
    const adminData = JSON.parse(localStorage.getItem('adminInfo'));
    if (adminData) {
      if (adminData.isAdmin && adminData.token && adminData.timeStamp) {
        this.authService.isLoggedIn.next(adminData.isAdmin);
        const diff = Math.abs(new Date().getTime() - new Date(adminData.timeStamp).getTime()) / 36e5;
        if (diff > 24) {
          this.authService.logout();
          this.snackBar.open('Logged Out Due to token Expiration !', 'OK', { duration: 3000 });
        }
      }
    }
  }
}
