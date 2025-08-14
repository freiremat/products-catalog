import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const username = form.value.username;
      const password = form.value.password;

      if (username === 'admin' && password === 'admin@123') {
        this.authService.login('admin');
      }
      else if (username === 'client' && password === 'client@123') {
        this.authService.login('client');
      }
      else if (username === 'seller' && password === 'seller@123') {
        this.authService.login('seller');
      }
      else {
        alert('Credenciais inválidas. Tente novamente.');
        return;
      }

      this.loginSuccess.emit();
    }
  }
}