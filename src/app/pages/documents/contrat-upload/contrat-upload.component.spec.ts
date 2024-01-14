import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratUploadComponent } from './contrat-upload.component';

describe('ContratUploadComponent', () => {
  let component: ContratUploadComponent;
  let fixture: ComponentFixture<ContratUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
