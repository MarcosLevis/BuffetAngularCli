import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSugerenciaComponent } from './agregar-sugerencia.component';

describe('AgregarSugerenciaComponent', () => {
  let component: AgregarSugerenciaComponent;
  let fixture: ComponentFixture<AgregarSugerenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarSugerenciaComponent]
    });
    fixture = TestBed.createComponent(AgregarSugerenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
