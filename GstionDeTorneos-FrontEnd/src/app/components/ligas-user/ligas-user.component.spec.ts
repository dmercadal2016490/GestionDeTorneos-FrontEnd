import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigasUserComponent } from './ligas-user.component';

describe('LigasUserComponent', () => {
  let component: LigasUserComponent;
  let fixture: ComponentFixture<LigasUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigasUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigasUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
