import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contrat1Component } from './contrat1.component';

describe('Contrat1Component', () => {
  let component: Contrat1Component;
  let fixture: ComponentFixture<Contrat1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Contrat1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Contrat1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
