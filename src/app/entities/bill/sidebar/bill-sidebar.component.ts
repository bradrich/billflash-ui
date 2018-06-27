import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { appLogoImage, appName } from '../../../app.constants';
import { BillService } from '../bill.service';

@Component({
  selector: 'bf-bill-sidebar',
  templateUrl: './bill-sidebar.component.html',
  styleUrls: ['./bill-sidebar.component.scss']
})
export class BillSidebarComponent implements OnInit, OnDestroy {

  assets: any;
  appName = appName;
  appLogoImage = appLogoImage;
  isDetailPage = false;

  private onDestroy = new Subject();

  constructor(
    private billService: BillService
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.assets = {
      headerImage: require(`../../../../assets/images/${this.appLogoImage}`)
    };

    this.getIsDetailPage();
  }

  /**
   * OnDestroy life-cycle method.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Gets `isDetailPage` from `BillService`.
   */
  getIsDetailPage() {
    this.billService.getIsDetailPage()
        .pipe(takeUntil(this.onDestroy))
        .subscribe((val: boolean) => {
          this.isDetailPage = val;
        });
  }

}
