import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePlansComponent } from './change-plans.component';

describe('ChangePlansComponent', () => {
  let component: ChangePlansComponent;
  let fixture: ComponentFixture<ChangePlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
