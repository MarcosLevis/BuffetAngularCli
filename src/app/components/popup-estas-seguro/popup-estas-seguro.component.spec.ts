import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEstasSeguroComponent } from './popup-estas-seguro.component';

describe('PopupEstasSeguroComponent', () => {
  let component: PopupEstasSeguroComponent;
  let fixture: ComponentFixture<PopupEstasSeguroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupEstasSeguroComponent]
    });
    fixture = TestBed.createComponent(PopupEstasSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
