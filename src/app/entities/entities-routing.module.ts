import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomRoutes } from '@billflash/shared';

import { billListRoute } from './bill/bill.route';

const routes: CustomRoutes = [
  billListRoute
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class EntitiesRoutingModule {}
