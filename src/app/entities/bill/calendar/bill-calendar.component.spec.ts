import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCalendarComponent } from './bill-calendar.component';

describe('BillCalendarComponent', () => {
  let component: BillCalendarComponent;
  let fixture: ComponentFixture<BillCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
