import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexualEventComponent } from './sexual-event.component';

describe('SexualEventComponent', () => {
  let component: SexualEventComponent;
  let fixture: ComponentFixture<SexualEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SexualEventComponent]
    });
    fixture = TestBed.createComponent(SexualEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
