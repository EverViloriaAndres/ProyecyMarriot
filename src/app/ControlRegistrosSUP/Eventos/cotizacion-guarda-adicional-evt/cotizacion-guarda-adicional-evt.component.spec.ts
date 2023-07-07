import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionGuardaAdicionalEvtComponent } from './cotizacion-guarda-adicional-evt.component';

describe('CotizacionGuardaAdicionalEvtComponent', () => {
  let component: CotizacionGuardaAdicionalEvtComponent;
  let fixture: ComponentFixture<CotizacionGuardaAdicionalEvtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CotizacionGuardaAdicionalEvtComponent]
    });
    fixture = TestBed.createComponent(CotizacionGuardaAdicionalEvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
