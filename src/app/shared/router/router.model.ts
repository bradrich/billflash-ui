import { Route } from '@angular/router';

export interface RouteData {
  name?: string;
  title?: string;
  authorities?: string[];
  isAuthRoute?: boolean;
  sidenavHighlight?: string;
  preload?: boolean;
}

export interface CustomRoute extends Route {
  data?: RouteData;
}

export declare type CustomRoutes = CustomRoute[];
