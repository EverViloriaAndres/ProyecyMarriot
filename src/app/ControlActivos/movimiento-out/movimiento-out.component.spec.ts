import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoOUTComponent } from './movimiento-out.component';

describe('MovimientoOUTComponent', () => {
  let component: MovimientoOUTComponent;
  let fixture: ComponentFixture<MovimientoOUTComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovimientoOUTComponent]
    });
    fixture = TestBed.createComponent(MovimientoOUTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
