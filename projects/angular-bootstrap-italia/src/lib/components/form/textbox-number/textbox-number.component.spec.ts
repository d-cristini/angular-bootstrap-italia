import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextboxNumberComponent } from './textbox-number.component';

describe('TextboxNumberComponent', () => {
  let component: TextboxNumberComponent;
  let fixture: ComponentFixture<TextboxNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextboxNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextboxNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
