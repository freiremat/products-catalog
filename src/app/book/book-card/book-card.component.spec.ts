import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCardComponent } from './book-card.component';
import { TableModule } from 'primeng/table';
import { RouterTestingModule } from '@angular/router/testing';
import '@angular/localize/init'
import { Book } from 'src/app/model/book';


describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TableModule
      ],
      declarations: [BookCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expect to call method onCardClick', () => {

    spyOn(component.bookClicked, 'emit');

    component.onCardClick();

    expect(component.bookClicked.emit).toHaveBeenCalledWith(component.book.id);
  });

  it('expect to call method onSaveClicked', () => {
    const mockBook: Book = {
      id: 1,
      description: 'string',
      iconUrl: 'string',
      longDescription: 'string',
      category: 'string',
      date: '2012-09-12',
    }

    const description = 'New Description';

    spyOn(component.bookEmitter, 'emit');

    component.book = mockBook;
    component.onSaveClicked(description);

    expect(component.bookEmitter.emit).toHaveBeenCalledWith({ ...mockBook, description });
  });

  it('expect to call method onTitleChanged', () => {
    const mockBook: Book = {
      id: 1,
      description: 'Old Description',
      iconUrl: 'string',
      longDescription: 'string',
      category: 'string',
      date: '2012-09-12',
    };
    
    const newTitle = 'New Title';
    
    component.book = mockBook;
    component.onTitleChanged(newTitle);

    expect(component.book.description).toBe(newTitle);
  });
});
