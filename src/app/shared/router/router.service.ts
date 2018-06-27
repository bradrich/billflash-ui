import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RoutesRecognized,
  UrlSegment
} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

enum RouteInterceptorEvents {
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  ConfigLoadStart,
  ConfigLoadEnd,
  RouteRecognized
}

@Injectable()
export class RouterService {
  private events: Map<number, Observable<Event>> = new Map();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionStorage: SessionStorageService
  ) {
    this.populateEventMap();
  }

  /**
   * Stores the requested previous route URL.
   * @param {UrlSegment[]} url
   */
  storeUrl(url: UrlSegment[]) {
    this.sessionStorage.store('previousUrl', url);
  }

  /**
   * Gets the previous route URL.
   * @returns {UrlSegment[]}
   */
  getUrl(): UrlSegment[] {
    return this.sessionStorage.retrieve('previousUrl');
  }

  /**
   * Gets the route from the `NavigationStart` event.
   * @returns {Observable<any>}
   */
  getRouteOnNavigationStart(): Observable<any> {
    return this.getRouteOn(RouteInterceptorEvents.NavigationStart);
  }

  /**
   * Gets the route from the `NavigationEnd` event.
   * @returns {Observable<any>}
   */
  getRouteOnNavigationEnd(): Observable<any> {
    return this.getRouteOn(RouteInterceptorEvents.NavigationEnd);
  }

  /**
   * Gets the route from the `NavigationCancel` event.
   * @returns {Observable<any>}
   */
  getRouteOnNavigationCancel(): Observable<any> {
    return this.getRouteOn(RouteInterceptorEvents.NavigationCancel);
  }

  /**
   * Gets the route from the `NavigationError` event.
   * @returns {Observable<any>}
   */
  getRouteOnNavigationError(): Observable<any> {
    return this.getRouteOn(RouteInterceptorEvents.NavigationError);
  }

  /**
   * Gets the route from the `RouteConfigLoadStart` event.
   * @returns {Observable<any>}
   */
  getRouteOnConfigLoadStart(): Observable<any> {
    return this.getRouteOn(RouteInterceptorEvents.ConfigLoadStart);
  }

  /**
   * Gets the route from the `RouteConfigLoadEnd` event.
   * @returns {Observable<any>}
   */
  getRouteOnConfigLoadEnd(): Observable<any> {
    return this.getRouteOn(RouteInterceptorEvents.ConfigLoadEnd);
  }

  /**
   * Gets the route from the `RoutesRecognized` event.
   * @returns {Observable<any>}
   */
  getRouteOnRouteRecognized(): Observable<any> {
    return this.getRouteOn(RouteInterceptorEvents.RouteRecognized);
  }

  /**
   * Maps the event down to its respective `ActivatedRoute`.
   * @private
   * @param {number} eventType
   * @returns {Observable<any>}
   */
  private getRouteOn(eventType: number): Observable<any> {
    return this.events[eventType].pipe(
      map(() => this.route),
      map((route) => {
        while (route['firstChild']) {
          route = route['firstChild'];
        }
        return route;
      }),
      filter((route) => route['outlet'] === 'primary')
    );
  }

  /**
   * Populates the `events` map.
   * @private
   */
  private populateEventMap() {
    this.events[RouteInterceptorEvents.NavigationStart] = this.router.events.pipe(
      filter((event) => event instanceof NavigationStart)
    );
    this.events[RouteInterceptorEvents.NavigationEnd] = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );
    this.events[RouteInterceptorEvents.NavigationCancel] = this.router.events.pipe(
      filter((event) => event instanceof NavigationCancel)
    );
    this.events[RouteInterceptorEvents.NavigationError] = this.router.events.pipe(
      filter((event) => event instanceof NavigationError)
    );
    this.events[RouteInterceptorEvents.ConfigLoadStart] = this.router.events.pipe(
      filter((event) => event instanceof RouteConfigLoadStart)
    );
    this.events[RouteInterceptorEvents.ConfigLoadEnd] = this.router.events.pipe(
      filter((event) => event instanceof RouteConfigLoadEnd)
    );
    this.events[RouteInterceptorEvents.RouteRecognized] = this.router.events.pipe(
      filter((event) => event instanceof RoutesRecognized)
    );
  }
}
