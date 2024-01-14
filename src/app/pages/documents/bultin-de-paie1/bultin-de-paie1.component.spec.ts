import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BultinDePaie1Component } from './bultin-de-paie1.component';

describe('BultinDePaie1Component', () => {
  let component: BultinDePaie1Component;
  let fixture: ComponentFixture<BultinDePaie1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BultinDePaie1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BultinDePaie1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
