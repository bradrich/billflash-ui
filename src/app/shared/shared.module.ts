import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AlertService } from './alert/alert.service';
import { EditPanelDirective } from './edit-panel/edit-panel.directive';
import { ErrorComponent } from './error/error.component';
import { NoResultsComponent } from './error/no-results/no-results.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import {
  UnsavedChangesDialogComponent
} from './error/unsaved-changes/unsaved-changes-dialog.component';
import { UnsavedChangesGuard } from './error/unsaved-changes/unsaved-changes.guard';
import { UnsavedChangesService } from './error/unsaved-changes/unsaved-changes.service';
import { FormButtonsComponent } from './form/buttons/form-buttons.component';
import { ColorPickerInputComponent } from './form/color-picker/color-picker-input.component';
import { ErrorMessagesComponent } from './form/error-messages/error-messages.component';
import { FormService } from './form/form.service';
import { LayoutService } from './layout/layout.service';
import { LoadingService } from './loading/loading.service';
import { SpinnerComponent } from './loading/spinner/spinner.component';
import { PageTitleService } from './page-title/page-title.service';
import { CapitalCasePipe } from './pipes/capital-case.pipe';
import { DebouncePipe } from './pipes/debounce.pipe';
import { DefaultValuePipe } from './pipes/default-value.pipe';
import { ElementPositionPipe } from './pipes/element-position.pipe';
import { EncryptedPipe } from './pipes/encrypted.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { NaturalTypingPipe } from './pipes/natural-typing.pipe';
import { NoSpacesPipe } from './pipes/no-spaces.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { RemoveUngroupedGroupPipe } from './pipes/remove-ungrouped-group.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { TitleCasePipe } from './pipes/title-case.pipe';
import { ResponsiveService } from './responsive/responsive.service';
import { RouterService } from './router/router.service';
import { SharedVendorModule } from './shared-vendor.module';

@NgModule({
  declarations: [
    EditPanelDirective,
    NoResultsComponent,
    PageNotFoundComponent,
    UnsavedChangesDialogComponent,
    ErrorComponent,
    FormButtonsComponent,
    ColorPickerInputComponent,
    ErrorMessagesComponent,
    SpinnerComponent,
    CapitalCasePipe,
    DebouncePipe,
    DefaultValuePipe,
    ElementPositionPipe,
    EncryptedPipe,
    FilterPipe,
    KeysPipe,
    NaturalTypingPipe,
    NoSpacesPipe,
    OrderByPipe,
    PhonePipe,
    RemoveUngroupedGroupPipe,
    ReversePipe,
    TitleCasePipe
  ],
  entryComponents: [
    UnsavedChangesDialogComponent
  ],
  exports: [
    SharedVendorModule,
    EditPanelDirective,
    NoResultsComponent,
    PageNotFoundComponent,
    UnsavedChangesDialogComponent,
    ErrorComponent,
    FormButtonsComponent,
    ColorPickerInputComponent,
    ErrorMessagesComponent,
    SpinnerComponent,
    CapitalCasePipe,
    DebouncePipe,
    DefaultValuePipe,
    ElementPositionPipe,
    EncryptedPipe,
    FilterPipe,
    KeysPipe,
    NaturalTypingPipe,
    NoSpacesPipe,
    OrderByPipe,
    PhonePipe,
    RemoveUngroupedGroupPipe,
    ReversePipe,
    TitleCasePipe
  ],
  imports: [
    SharedVendorModule
  ],
  providers: [
    AlertService,
    UnsavedChangesGuard,
    UnsavedChangesService,
    FormService,
    LayoutService,
    LoadingService,
    PageTitleService,
    ResponsiveService,
    RouterService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule {}
