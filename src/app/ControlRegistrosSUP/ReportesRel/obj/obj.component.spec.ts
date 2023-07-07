import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjComponent } from './obj.component';

describe('ObjComponent', () => {
  let component: ObjComponent;
  let fixture: ComponentFixture<ObjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjComponent]
    });
    fixture = TestBed.createComponent(ObjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
