import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomRouterStateSerializer, CustomRoutes, pageNotFoundRoute } from '@billflash/shared';
import { RouterStateSerializer } from '@ngrx/router-store';

import { appLandingRoute } from './app.constants';

const routes: CustomRoutes = [
  {
    path: '',
    redirectTo: appLandingRoute,
    pathMatch: 'full'
  },
  pageNotFoundRoute
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      // enableTracing: true, // Debug purposes only
    })
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ]
})
export class AppRoutingModule {}
