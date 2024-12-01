import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

let activatedRouteStub: Partial<ActivatedRoute>;

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    activatedRouteStub = {};

    await TestBed.configureTestingModule({
      imports: [
        ButtonModule,
        MenubarModule,
        RouterTestingModule
      ],
      declarations: [HeaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    route = TestBed.get(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize items on ngOnInit', () => {
    component.ngOnInit();
    expect(component.items).toEqual([
      {
        label: 'Book Catalog',
        routerLink: 'book-catalog',
        icon: 'pi pi-book'
      },
      {
        label: 'Stock',
        routerLink: 'book-stock',
        icon: 'pi pi-warehouse'
      },
      {
        label: 'Order',
        routerLink: 'book-order',
        icon: 'pi pi-cart-plus'
      },
      {
        label: 'Sign Out',
        routerLink: 'login',
        icon: 'pi pi-sign-out',
      },
    ]);
  });

  it('should have items defined', () => {
    expect(component.items).toBeDefined();
  });

  it('should have correct number of menu items', () => {
    component.ngOnInit();
    expect(component.items.length).toBe(4);
  });
});
