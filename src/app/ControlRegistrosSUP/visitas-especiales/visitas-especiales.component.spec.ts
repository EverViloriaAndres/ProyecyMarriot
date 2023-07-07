import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitasEspecialesComponent } from './visitas-especiales.component';

describe('VisitasEspecialesComponent', () => {
  let component: VisitasEspecialesComponent;
  let fixture: ComponentFixture<VisitasEspecialesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitasEspecialesComponent]
    });
    fixture = TestBed.createComponent(VisitasEspecialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
