import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EntitiesModule } from '@billflash/entities';
import { SharedModule } from '@billflash/shared';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    EntitiesModule,
    AppRoutingModule
  ]
})
export class AppModule {}
