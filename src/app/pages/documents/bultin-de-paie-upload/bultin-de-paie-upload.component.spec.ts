import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BultinDePaieUploadComponent } from './bultin-de-paie-upload.component';

describe('BultinDePaieUploadComponent', () => {
  let component: BultinDePaieUploadComponent;
  let fixture: ComponentFixture<BultinDePaieUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BultinDePaieUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BultinDePaieUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
