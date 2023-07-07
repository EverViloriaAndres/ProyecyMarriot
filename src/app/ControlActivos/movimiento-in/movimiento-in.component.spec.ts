import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoInComponent } from './movimiento-in.component';

describe('MovimientoInComponent', () => {
  let component: MovimientoInComponent;
  let fixture: ComponentFixture<MovimientoInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovimientoInComponent]
    });
    fixture = TestBed.createComponent(MovimientoInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
