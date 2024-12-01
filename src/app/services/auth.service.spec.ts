import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        localStorage.clear();
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should authenticate as admin if no role is stored', () => {
        expect(service.getRole()).toBe('admin');
        expect(service.isAuthenticated()).toBeTrue();
    });

    it('should login with a specified role', () => {
        service.login('user');
        expect(service.getRole()).toBe('user');
        expect(service.isAuthenticated()).toBeTrue();
        expect(localStorage.getItem('userRole')).toBe('user');
    });

    it('should logout and clear the role', () => {
        service.login('user');
        service.logout();
        expect(service.getRole()).toBeNull();
        expect(service.isAuthenticated()).toBeFalse();
        expect(localStorage.getItem('userRole')).toBeNull();
    });

    it('should retrieve the stored role from localStorage', () => {
        localStorage.setItem('userRole', 'guest');
        const newService = new AuthService();
        expect(newService.getRole()).toBe('guest');
        expect(newService.isAuthenticated()).toBeTrue();
    });
});