import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequuerimientoCasualComponent } from './requuerimiento-casual.component';

describe('RequuerimientoCasualComponent', () => {
  let component: RequuerimientoCasualComponent;
  let fixture: ComponentFixture<RequuerimientoCasualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequuerimientoCasualComponent]
    });
    fixture = TestBed.createComponent(RequuerimientoCasualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
