import { CustomRoute } from '@billflash/shared';

import { BillListComponent } from './list/bill-list.component';

export const billListRoute: CustomRoute = {
  path: 'bills',
  component: BillListComponent,
  data: {
    name: 'bills',
    title: 'Your Bills',
    isAuthRoute: false
  }
};
