import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MomentModule } from 'angular2-moment';
import { Ng2Webstorage } from 'ngx-webstorage';

import { SharedApolloModule } from './shared-apollo.module';
import { SharedMaterialModule } from './shared-material.module';

@NgModule({
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgProgressModule,
    NgProgressHttpModule,
    MomentModule,
    Ng2Webstorage,
    NgxDatatableModule,
    SharedApolloModule,
    SharedMaterialModule
  ],
  imports: [
    NgbModule.forRoot(),
    NgProgressModule.forRoot(),
    Ng2Webstorage.forRoot({ prefix: 'bf', separator: '-', caseSensitive: true })
  ],
  providers: [
    Title,
    { provide: LOCALE_ID, useValue: 'en' }
  ]
})
export class SharedVendorModule {}
