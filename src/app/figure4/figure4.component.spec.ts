import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Figure4Component } from './figure4.component';

describe('Figure4Component', () => {
  let component: Figure4Component;
  let fixture: ComponentFixture<Figure4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Figure4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Figure4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
