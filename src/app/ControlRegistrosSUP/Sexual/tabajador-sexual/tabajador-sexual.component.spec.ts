import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabajadorSexualComponent } from './tabajador-sexual.component';

describe('TabajadorSexualComponent', () => {
  let component: TabajadorSexualComponent;
  let fixture: ComponentFixture<TabajadorSexualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabajadorSexualComponent]
    });
    fixture = TestBed.createComponent(TabajadorSexualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
