import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoginRoute: boolean = false;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.checkLoginRoute();
    this.router.events.subscribe(() => {
      this.checkLoginRoute();
    });

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/book-catalog']);
    }
  }

  checkLoginRoute() {
    this.isLoginRoute = this.router.url === '/login';
  }

  onLoginSuccess() {
    this.router.navigate(['/book-catalog']);
  }
}
