import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
class MockAuthService {
  private role: string | null = null;

  constructor() { }

  login(role: string) {
    this.role = role;
  }

  logout() {
    this.role = null;
  }

  getRole(): string | null {
    return this.role;
  }

  isAuthenticated(): boolean {
    return this.role !== null;
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: MockAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ButtonModule
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login with admin role on valid admin credentials', () => {
    const mockForm = {
      valid: true,
      value: {
        username: 'admin',
        password: 'admin@123'
      }
    };

    component.onSubmit(mockForm as NgForm);

    expect(authService.getRole()).toBe('admin');
  });

  it('should call login with client role on valid client credentials', () => {
    const mockForm = {
      valid: true,
      value: {
        username: 'client',
        password: 'client@123'
      }
    };

    component.onSubmit(mockForm as NgForm);

    expect(authService.getRole()).toBe('client');
  });

  it('should call login with user role on valid seller credentials', () => {
    const mockForm = {
      valid: true,
      value: {
        username: 'seller',
        password: 'seller@123'
      }
    };

    component.onSubmit(mockForm as NgForm);

    expect(authService.getRole()).toBe('seller');
  });

  it('should alert invalid credentials on invalid login', () => {
    spyOn(window, 'alert');

    const mockForm = {
      valid: true,
      value: {
        username: 'invalidUser ',
        password: 'wrongPassword'
      }
    };

    component.onSubmit(mockForm as NgForm);

    expect(window.alert).toHaveBeenCalledWith('Credenciais inválidas. Tente novamente.');
  });

  it('should not call login if form is invalid', () => {
    const mockForm = {
      valid: false,
      value: {
        username: '',
        password: ''
      }
    };

    spyOn(authService, 'login');

    component.onSubmit(mockForm as NgForm);

    expect(authService.login).not.toHaveBeenCalled();
  });
});