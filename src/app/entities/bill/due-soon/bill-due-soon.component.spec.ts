import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDueSoonComponent } from './bill-due-soon.component';

describe('BillDueSoonComponent', () => {
  let component: BillDueSoonComponent;
  let fixture: ComponentFixture<BillDueSoonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillDueSoonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillDueSoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
