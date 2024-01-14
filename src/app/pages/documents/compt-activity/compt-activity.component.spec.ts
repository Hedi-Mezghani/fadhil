import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptActivityComponent } from './compt-activity.component';

describe('ComptActivityComponent', () => {
  let component: ComptActivityComponent;
  let fixture: ComponentFixture<ComptActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComptActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
