import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicModalFormComponent } from './dynamic-modal-form.component';

describe('DynamicModalFormComponent', () => {
  let component: DynamicModalFormComponent;
  let fixture: ComponentFixture<DynamicModalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicModalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
