import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadorSexualANDSexualEventComponent } from './trabajador-sexual-andsexual-event.component';

describe('TrabajadorSexualANDSexualEventComponent', () => {
  let component: TrabajadorSexualANDSexualEventComponent;
  let fixture: ComponentFixture<TrabajadorSexualANDSexualEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrabajadorSexualANDSexualEventComponent]
    });
    fixture = TestBed.createComponent(TrabajadorSexualANDSexualEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
