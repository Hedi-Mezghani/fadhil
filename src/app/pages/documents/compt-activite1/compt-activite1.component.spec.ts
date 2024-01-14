import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptActivite1Component } from './compt-activite1.component';

describe('ComptActivite1Component', () => {
  let component: ComptActivite1Component;
  let fixture: ComponentFixture<ComptActivite1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComptActivite1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptActivite1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
