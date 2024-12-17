import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstasSeguroComponent } from './estas-seguro.component';

describe('EstasSeguroComponent', () => {
  let component: EstasSeguroComponent;
  let fixture: ComponentFixture<EstasSeguroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstasSeguroComponent]
    });
    fixture = TestBed.createComponent(EstasSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
