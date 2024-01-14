import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterFichesComponent } from './ajouter-fiches.component';

describe('AjouterFichesComponent', () => {
  let component: AjouterFichesComponent;
  let fixture: ComponentFixture<AjouterFichesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterFichesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterFichesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
