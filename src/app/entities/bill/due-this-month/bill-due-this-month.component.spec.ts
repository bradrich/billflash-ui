import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDueThisMonthComponent } from './bill-due-this-month.component';

describe('BillDueThisMonthComponent', () => {
  let component: BillDueThisMonthComponent;
  let fixture: ComponentFixture<BillDueThisMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillDueThisMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillDueThisMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
