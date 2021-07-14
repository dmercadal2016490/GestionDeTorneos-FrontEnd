import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveLigaComponent } from './save-liga.component';

describe('SaveLigaComponent', () => {
  let component: SaveLigaComponent;
  let fixture: ComponentFixture<SaveLigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveLigaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveLigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
