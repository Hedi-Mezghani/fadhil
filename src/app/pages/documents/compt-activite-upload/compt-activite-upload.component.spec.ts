import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptActiviteUploadComponent } from './compt-activite-upload.component';

describe('ComptActiviteUploadComponent', () => {
  let component: ComptActiviteUploadComponent;
  let fixture: ComponentFixture<ComptActiviteUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComptActiviteUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptActiviteUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
