import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportArqueoComponent } from './report-arqueo.component';

describe('ReportArqueoComponent', () => {
  let component: ReportArqueoComponent;
  let fixture: ComponentFixture<ReportArqueoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportArqueoComponent]
    });
    fixture = TestBed.createComponent(ReportArqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
