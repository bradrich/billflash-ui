import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillSnapshotComponent } from './bill-snapshot.component';

describe('BillSnapshotComponent', () => {
  let component: BillSnapshotComponent;
  let fixture: ComponentFixture<BillSnapshotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillSnapshotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
