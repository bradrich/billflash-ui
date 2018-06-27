import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { Bill } from '../../bill/bill.model';
import { BillService } from '../../bill/bill.service';
import { Tag } from '../tag.model';
import { TagService } from '../tag.service';

@Component({
  selector: 'bf-tag-list',
  templateUrl: './tag-list.component.html'
})
export class TagListComponent implements OnInit, OnDestroy {

  @ViewChild('popover') popover: NgbPopover;

  currentBill: Bill;
  isCreating = false;

  private onDestroy = new Subject();

  constructor(
    private tagService: TagService,
    private billService: BillService
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.getCurrentBill();
  }

  /**
   * OnDestroy life-cycle method.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Gets `currentBill` from `BillService`.
   */
  getCurrentBill() {
    this.billService.getCurrentBill()
        .pipe(
          distinctUntilChanged(),
          takeUntil(this.onDestroy)
        )
        .subscribe((bill: Bill) => {
          if (bill) {
            this.currentBill = bill;
          }
        });
  }

  /**
   * Closes the create tag popover after tag creation.
   */
  create() {
    this.popover.close();
  }

  /**
   * Deletes a tag.
   * @param {Tag} tag
   */
  remove(tag: Tag) {
    const variables = {
      where: {
        id: tag.id,
        name: tag.name
      }
    };
    const queryVariables = {
      where: { id: this.currentBill.id }
    };

    this.tagService.delete(variables, queryVariables)
        .subscribe(() => {}, (err) => {
          console.error(err);
        });
  }

}
