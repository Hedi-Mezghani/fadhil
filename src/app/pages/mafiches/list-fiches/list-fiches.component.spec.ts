import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFichesComponent } from './list-fiches.component';

describe('ListFichesComponent', () => {
  let component: ListFichesComponent;
  let fixture: ComponentFixture<ListFichesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFichesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFichesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
