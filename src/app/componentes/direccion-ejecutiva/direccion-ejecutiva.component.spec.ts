import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionEjecutivaComponent } from './direccion-ejecutiva.component';

describe('DireccionEjecutivaComponent', () => {
  let component: DireccionEjecutivaComponent;
  let fixture: ComponentFixture<DireccionEjecutivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DireccionEjecutivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionEjecutivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
