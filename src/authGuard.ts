import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const userRole = this.authService.getRole() ?? ''; // Fornece uma string vazia se for null
    // Verifica se o usuário está autenticado
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Verifica se o usuário tem permissão para acessar a rota
    const allowedRoles = route.data['roles'] as Array<string>;
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      this.router.navigate(['/login']); // Redireciona se não tiver permissão
      return false;
    }

    return true;
  }
}