import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, LoginComponent, HeaderComponent, CommonModule],
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
      // this.router.navigate(['/book-catalog']);
    }
  }

  checkLoginRoute() {
    this.isLoginRoute = this.router.url === '/login';
  }

  onLoginSuccess() {
    this.router.navigate(['/book-catalog']);
  }
}
