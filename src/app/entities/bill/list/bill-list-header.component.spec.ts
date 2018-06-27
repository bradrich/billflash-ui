import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillListHeaderComponent } from './bill-list-header.component';

describe('BillListHeaderComponent', () => {
  let component: BillListHeaderComponent;
  let fixture: ComponentFixture<BillListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillListHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
