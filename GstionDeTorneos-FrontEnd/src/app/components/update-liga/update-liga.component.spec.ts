import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLigaComponent } from './update-liga.component';

describe('UpdateLigaComponent', () => {
  let component: UpdateLigaComponent;
  let fixture: ComponentFixture<UpdateLigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLigaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
