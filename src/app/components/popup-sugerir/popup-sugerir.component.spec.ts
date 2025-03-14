import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSugerirComponent } from './popup-sugerir.component';

describe('PopupSugerirComponent', () => {
  let component: PopupSugerirComponent;
  let fixture: ComponentFixture<PopupSugerirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupSugerirComponent]
    });
    fixture = TestBed.createComponent(PopupSugerirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
