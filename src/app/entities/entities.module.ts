import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@billflash/shared';

import { BillService } from './bill/bill.service';
import { BillCalendarComponent } from './bill/calendar/bill-calendar.component';
import { BillDueSoonComponent } from './bill/due-soon/bill-due-soon.component';
import { BillDueThisMonthComponent } from './bill/due-this-month/bill-due-this-month.component';
import { BillEditDialogComponent } from './bill/edit/bill-edit-dialog.component';
import { BillListHeaderComponent } from './bill/list/bill-list-header.component';
import { BillListComponent } from './bill/list/bill-list.component';
import { BillNotesComponent } from './bill/notes/bill-notes.component';
import { BillRepeatIntervalPipe } from './bill/pipes/bill-repeat-interval.pipe';
import { BillTypeIconPipe } from './bill/pipes/bill-type-icon.pipe';
import { BillSearchComponent } from './bill/search/bill-search.component';
import { BillSidebarComponent } from './bill/sidebar/bill-sidebar.component';
import { BillSnapshotComponent } from './bill/snapshot/bill-snapshot.component';
import { EntitiesRoutingModule } from './entities-routing.module';
import { TagCreateComponent } from './tag/create/tag-create.component';
import { TagListComponent } from './tag/list/tag-list.component';
import { TagService } from './tag/tag.service';

@NgModule({
  declarations: [
    BillCalendarComponent,
    BillDueSoonComponent,
    BillDueThisMonthComponent,
    BillEditDialogComponent,
    BillListHeaderComponent,
    BillListComponent,
    BillNotesComponent,
    BillRepeatIntervalPipe,
    BillTypeIconPipe,
    BillSearchComponent,
    BillSidebarComponent,
    BillSnapshotComponent,
    TagCreateComponent,
    TagListComponent
  ],
  entryComponents: [
    BillEditDialogComponent
  ],
  exports: [
    BillCalendarComponent,
    BillDueSoonComponent,
    BillDueThisMonthComponent,
    BillNotesComponent,
    BillSidebarComponent,
    BillSnapshotComponent,
    TagCreateComponent,
    TagListComponent
  ],
  imports: [
    SharedModule,
    EntitiesRoutingModule
  ],
  providers: [
    BillService,
    TagService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class EntitiesModule {}
