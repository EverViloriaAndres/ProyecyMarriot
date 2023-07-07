import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadDiariaComponent } from './novedad-diaria.component';

describe('NovedadDiariaComponent', () => {
  let component: NovedadDiariaComponent;
  let fixture: ComponentFixture<NovedadDiariaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovedadDiariaComponent]
    });
    fixture = TestBed.createComponent(NovedadDiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
