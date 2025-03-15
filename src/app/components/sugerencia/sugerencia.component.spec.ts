import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugerenciaComponent } from './sugerencia.component';

describe('SugerenciaComponent', () => {
  let component: SugerenciaComponent;
  let fixture: ComponentFixture<SugerenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SugerenciaComponent]
    });
    fixture = TestBed.createComponent(SugerenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
