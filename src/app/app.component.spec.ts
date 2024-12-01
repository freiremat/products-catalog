import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service';

let activatedRouteStub: Partial<ActivatedRoute>;

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let route: ActivatedRoute;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    activatedRouteStub = {};
    authService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);


    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: AuthService,
          useValue: { authService }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    route = TestBed.get(ActivatedRoute);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('expect to call method onLoginSuccess', () => {

    const routerSpy = spyOn(component['router'], 'navigate').and.stub();

    component.onLoginSuccess();

    expect(routerSpy).toHaveBeenCalledWith(['/book-catalog']);
  })

  it('should set isLoginRoute to true when the current route is /login', () => {
    spyOnProperty(component['router'], 'url', 'get').and.returnValue('/login');

    component.checkLoginRoute();

    expect(component.isLoginRoute).toBeTrue();
  });

  it('should set isLoginRoute to false when the current route is not /login', () => {
    spyOnProperty(component['router'], 'url', 'get').and.returnValue('/home');

    component.checkLoginRoute();

    expect(component.isLoginRoute).toBeFalse();
  });
});
