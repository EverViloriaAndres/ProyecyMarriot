import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigacionesComponent } from './investigaciones.component';

describe('InvestigacionesComponent', () => {
  let component: InvestigacionesComponent;
  let fixture: ComponentFixture<InvestigacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestigacionesComponent]
    });
    fixture = TestBed.createComponent(InvestigacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
