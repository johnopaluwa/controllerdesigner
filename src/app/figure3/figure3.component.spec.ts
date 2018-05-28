import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Figure3Component } from './figure3.component';

describe('Figure3Component', () => {
  let component: Figure3Component;
  let fixture: ComponentFixture<Figure3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Figure3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Figure3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
