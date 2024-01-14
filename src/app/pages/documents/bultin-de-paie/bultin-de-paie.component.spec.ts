import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BultinDePaieComponent } from './bultin-de-paie.component';

describe('BultinDePaieComponent', () => {
  let component: BultinDePaieComponent;
  let fixture: ComponentFixture<BultinDePaieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BultinDePaieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BultinDePaieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
