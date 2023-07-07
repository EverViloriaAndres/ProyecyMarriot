import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteExtravioComponent } from './reporte-extravio.component';

describe('ReporteExtravioComponent', () => {
  let component: ReporteExtravioComponent;
  let fixture: ComponentFixture<ReporteExtravioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteExtravioComponent]
    });
    fixture = TestBed.createComponent(ReporteExtravioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
