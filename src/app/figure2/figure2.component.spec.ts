import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Figure2Component } from './figure2.component';

describe('Figure2Component', () => {
  let component: Figure2Component;
  let fixture: ComponentFixture<Figure2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Figure2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Figure2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
