import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormElementComponent } from './dynamic-form-element.component';

describe('DynamicFormElementComponent', () => {
  let component: DynamicFormElementComponent;
  let fixture: ComponentFixture<DynamicFormElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
