import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookModalComponent } from './book-modal.component';

describe('BookModalComponent', () => {
  let component: BookModalComponent;
  let fixture: ComponentFixture<BookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expect to call close method', () => {
    spyOn(component.closeModal, 'emit');

    component.close();

    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('expect to call method onSubmit', () => {
    spyOn(component.bookUpdated, 'emit');

    component.onSubmit();

    expect(component.bookUpdated.emit).toHaveBeenCalledWith(component.book);
  });
});
