import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

import { RouteData } from './router.model';

export interface RouterStateInfo {
  url: string;
  params: Params;
  queryParams: Params;
  data: RouteData;
}

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateInfo> {
  serialize(routerState: RouterStateSnapshot): RouterStateInfo {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params, data } = route;

    // Only return an object containing the URL, params, query params, and data instead of the
    // entire snapshot.
    return { url, params, queryParams, data };
  }
}
