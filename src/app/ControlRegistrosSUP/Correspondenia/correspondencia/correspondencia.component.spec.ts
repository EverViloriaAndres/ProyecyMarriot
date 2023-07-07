import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrespondenciaComponent } from './correspondencia.component';

describe('CorrespondenciaComponent', () => {
  let component: CorrespondenciaComponent;
  let fixture: ComponentFixture<CorrespondenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorrespondenciaComponent]
    });
    fixture = TestBed.createComponent(CorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
