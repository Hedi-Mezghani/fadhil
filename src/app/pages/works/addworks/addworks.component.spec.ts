import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddworksComponent } from './addworks.component';

describe('AddworksComponent', () => {
  let component: AddworksComponent;
  let fixture: ComponentFixture<AddworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddworksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
