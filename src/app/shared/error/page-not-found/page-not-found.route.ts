import { CustomRoute } from '../../router/router.model';
import { PageNotFoundComponent } from './page-not-found.component';

export const pageNotFoundRoute: CustomRoute = {
  path: '**',
  component: PageNotFoundComponent,
  data: {
    name: 'pageNotFound',
    title: '404 Page Not Found',
    isAuthRoute: false
  }
};
