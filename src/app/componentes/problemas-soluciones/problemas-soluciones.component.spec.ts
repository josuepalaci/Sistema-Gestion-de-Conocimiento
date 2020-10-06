import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemasSolucionesComponent } from './problemas-soluciones.component';

describe('ProblemasSolucionesComponent', () => {
  let component: ProblemasSolucionesComponent;
  let fixture: ComponentFixture<ProblemasSolucionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemasSolucionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemasSolucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
