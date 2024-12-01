import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role: string | null = null;

  constructor() {
    // Verifica se já existe um papel armazenado
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      this.role = storedRole; // Se existir, define o papel
    } else {
      // Se não houver, autentica como admin
      this.login('admin');
    }
  }

  login(role: string) {
    this.role = role;
    localStorage.setItem('userRole', role);
  }

  logout() {
    this.role = null;
    localStorage.removeItem('userRole');
  }

  getRole(): string | null {
    return this.role || localStorage.getItem('userRole');
  }

  isAuthenticated(): boolean {
    return this.role !== null || localStorage.getItem('userRole') !== null;
  }
}