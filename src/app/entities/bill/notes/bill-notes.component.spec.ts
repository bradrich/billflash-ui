import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillNotesComponent } from './bill-notes.component';

describe('BillNotesComponent', () => {
  let component: BillNotesComponent;
  let fixture: ComponentFixture<BillNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
