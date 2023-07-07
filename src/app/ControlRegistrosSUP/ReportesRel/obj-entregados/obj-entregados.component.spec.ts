import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjEntregadosComponent } from './obj-entregados.component';

describe('ObjEntregadosComponent', () => {
  let component: ObjEntregadosComponent;
  let fixture: ComponentFixture<ObjEntregadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjEntregadosComponent]
    });
    fixture = TestBed.createComponent(ObjEntregadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
