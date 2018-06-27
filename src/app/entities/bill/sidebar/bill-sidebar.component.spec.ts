import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillSidebarComponent } from './bill-sidebar.component';

describe('BillSidebarComponent', () => {
  let component: BillSidebarComponent;
  let fixture: ComponentFixture<BillSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
