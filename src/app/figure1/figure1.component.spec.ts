import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Figure1Component } from './figure1.component';

describe('Figure1Component', () => {
  let component: Figure1Component;
  let fixture: ComponentFixture<Figure1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Figure1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Figure1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
