import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrespondenciaEntregadaComponent } from './correspondencia-entregada.component';

describe('CorrespondenciaEntregadaComponent', () => {
  let component: CorrespondenciaEntregadaComponent;
  let fixture: ComponentFixture<CorrespondenciaEntregadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorrespondenciaEntregadaComponent]
    });
    fixture = TestBed.createComponent(CorrespondenciaEntregadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
