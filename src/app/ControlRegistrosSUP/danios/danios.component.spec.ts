import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaniosComponent } from './danios.component';

describe('DaniosComponent', () => {
  let component: DaniosComponent;
  let fixture: ComponentFixture<DaniosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DaniosComponent]
    });
    fixture = TestBed.createComponent(DaniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
