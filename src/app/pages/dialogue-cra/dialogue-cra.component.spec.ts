import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueCraComponent } from './dialogue-cra.component';

describe('DialogueCraComponent', () => {
  let component: DialogueCraComponent;
  let fixture: ComponentFixture<DialogueCraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueCraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueCraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
