import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  LayoutService,
  layoutSidenavWidth,
  LayoutWidths,
  ResponsiveService,
  RouteData,
  RouterService,
  SidenavService
} from '@billflash/shared';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { appColors } from './app.constants';

@Component({
  selector: 'bf-root',
  template: `
    <ng-progress [spinner]="false" [color]="appColors[0]"></ng-progress>

    <mat-sidenav-container>

      <mat-sidenav
        #sidenav
        position="start"
        [mode]="sidenavMode"
        [opened]="sidenavOpened | async">
        <bf-bill-sidebar></bf-bill-sidebar>
      </mat-sidenav>

      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>

    </mat-sidenav-container>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  appColors = appColors;
  isAuthRoute = true;
  sidenavMode: string;
  sidenavOpened: Observable<boolean> = this.sidenavService.getIsOpened();

  private onDestroy = new Subject();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private layoutService: LayoutService,
    private responsiveService: ResponsiveService,
    private routerService: RouterService,
    private sidenavService: SidenavService
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.watchNavigationEnd();
    this.watchBreakpoints();
    this.watchWindowResize();
  }

  /**
   * OnDestroy life-cycle method.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Watches the `Router` `NavigationEnd` event in order to set `isAuthRoute`.
   */
  watchNavigationEnd() {
    this.routerService
        .getRouteOnNavigationEnd()
        .pipe(
          map((route) => route.snapshot),
          takeUntil(this.onDestroy)
        )
        .subscribe((route) => {
          const routeData: RouteData = route.data;
          this.isAuthRoute = routeData.isAuthRoute;
        });
  }

  /**
   * Watches the `BreakpointObserver` in order to set the sidenav mode.
   */
  watchBreakpoints() {
    this.breakpointObserver
        .observe(`(max-width: 576px)`)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((result) => {
          // Set `sidenavMode` as well as closing or opening the sidenav.
          if (result.matches) {
            this.closeSidenav();
            this.sidenavMode = 'over';
          } else {
            this.openSidenav();
            this.sidenavMode = 'side';
          }
        });
  }

  /**
   * Watches the `window` resize event to change the sizes of the layout elements.
   */
  watchWindowResize() {
    this.responsiveService
        .getWindow()
        .pipe(filter((val) => val && val.innerWidth))
        .subscribe((val) => {
          // Set layout content widths.
          const contentWidth = this.sidenavMode === 'side' && this.sidenavOpened
              ? val.innerWidth - layoutSidenavWidth
              : val.innerWidth;
          const editWidth = Math.round(contentWidth * 0.26 + 58);
          const widths: LayoutWidths = {
            contentWidth: contentWidth - editWidth,
            editWidth: editWidth
          };
          this.layoutService.setWidths(widths);
        });
  }

  /**
   * Closes the sidenav by dispatching the event to the store.
   */
  closeSidenav() {
    this.sidenavService.setIsOpened(false);
  }

  /**
   * Opens the sidenav by dispatching the event to the store.
   */
  openSidenav() {
    this.sidenavService.setIsOpened(true);
  }

}
