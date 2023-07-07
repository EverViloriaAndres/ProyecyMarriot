import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitasEnfermeriaComponent } from './visitas-enfermeria.component';

describe('VisitasEnfermeriaComponent', () => {
  let component: VisitasEnfermeriaComponent;
  let fixture: ComponentFixture<VisitasEnfermeriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitasEnfermeriaComponent]
    });
    fixture = TestBed.createComponent(VisitasEnfermeriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
