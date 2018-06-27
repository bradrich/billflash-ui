import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatChipInputEvent, MatChipListChange } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  billActiveWhere,
  billArchivedWhere,
  billDueSoonWhere,
  billDueThisMonthWhere
} from '../bill.constants';
import { BillQueryVariables } from '../bill.graphql';
import { BillService } from '../bill.service';

@Component({
  selector: 'bf-bill-search',
  templateUrl: './bill-search.component.html',
  styleUrls: ['./bill-search.component.scss']
})
export class BillSearchComponent implements OnInit, OnDestroy {

  filterSeparatorKeyCodes = [ENTER, COMMA];
  queryVariables: BillQueryVariables;
  filters = ['Active', 'Archived', 'Due soon', 'Due this month'];
  filtersMap = new Map([
    [this.filters[0], billActiveWhere],
    [this.filters[1], billArchivedWhere],
    [this.filters[2], billDueSoonWhere],
    [this.filters[3], billDueThisMonthWhere]
  ]);
  filtersToDisplay = ['Active'];

  private onDestroy = new Subject();

  constructor(
    private billService: BillService
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.getQueryVariables();
  }

  /**
   * OnDestroy life-cycle method.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Gets the `queryVariables` from the `Store`.
   */
  getQueryVariables() {
    this.billService.getQueryVariables()
        .pipe(takeUntil(this.onDestroy))
        .subscribe((queryVariables: BillQueryVariables) => {
          this.queryVariables = queryVariables;
        });
  }

  /**
   * Adds a filter to the `queryVariables` `where` statement.
   * @param {MatChipInputEvent} event
   * @param {string} filterName
   */
  addFilter(event: MatChipInputEvent, filterName: string) {
    if (!event && !filterName) {
      throw new Error(`
        BillSearchComponent: Adding a filter requires either an MatChip event or filter name.
      `);
    }

    // If the filter is being added through a `MatChipInputEvent`, then set the `where` statement to
    // be filtering on `name` and `notes`.
    if (event) {
      const input = event.input;
      const value = event.value.trim();

      if (value === '') {
        return;
      }

      this.filtersMap.set(value, {
        OR: [
          { name_contains: value },
          { notes_contains: value }
        ]
      });

      filterName = value;

      if (input) {
        input.value = '';
      }
    }

    // Add the filter, if the filter isn't already in the list.
    if (this.filtersToDisplay.indexOf(filterName) === -1) {
      if (filterName === 'Active') {
        // If the filter is `Active`, then remove the `Archived` filter from the list.
        this.filtersToDisplay = this.filtersToDisplay
            .filter((filter: string) => filter !== 'Archived');
      } else if (filterName === 'Archived') {
        // If the filter is `Archived`, then remove the `Active` filter from the list.
        this.filtersToDisplay = this.filtersToDisplay
            .filter((filter: string) => filter !== 'Active');
      } else if (filterName === 'Due soon') {
        // If the filter is `Due soon`, then remove the `Due this month` filter from the list.
        this.filtersToDisplay = this.filtersToDisplay
            .filter((filter: string) => filter !== 'Due this month');
      } else if (filterName === 'Due this month') {
        // If the filter is `Due this month`, then remove the `Due soon` filter from the list.
        this.filtersToDisplay = this.filtersToDisplay
            .filter((filter: string) => filter !== 'Due soon');
      }

      this.filtersToDisplay.push(filterName);
    }

    console.log(this.filtersToDisplay);

    this.finalizeFilters();
  }

  /**
   * TODO: Figure out what in the world this does...
   * @param {MatChipListChange} event
   */
  filterChange(event: MatChipListChange) {
    console.log(event);
  }

  /**
   * Removes a filter from the `queryVariables` `where` statement.
   * @param {string} filterName
   */
  removeFilter(filterName: string) {
    this.filtersToDisplay = this.filtersToDisplay
        .filter((filter: string) => filter !== filterName);

    this.finalizeFilters();
  }

  /**
   * Finalizes the filter setup.
   */
  finalizeFilters() {
    let obj = {};
    this.filtersToDisplay.forEach((filter: string) => {
      obj = Object.assign(obj, this.filtersMap.get(filter));
    });

    this.queryVariables.where = obj;
    this.billService.setQueryVariables(this.queryVariables);
  }

}
