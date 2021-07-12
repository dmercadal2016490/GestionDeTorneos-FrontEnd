import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarLigasComponent } from './administrar-ligas.component';

describe('AdministrarLigasComponent', () => {
  let component: AdministrarLigasComponent;
  let fixture: ComponentFixture<AdministrarLigasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarLigasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarLigasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
