import { NgModule, Optional } from '@angular/core';
import {
  BrowserModule,
  HammerGestureConfig,
  HammerModule,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LeftDrawerComponent } from './layout/left-drawer/left-drawer.component';
import { RightDrawerComponent } from './layout/right-drawer/right-drawer.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FacilityOverviewComponent } from './screens/facility-overview/facility-overview.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DragBarComponent } from './layout/drag-bar/drag-bar.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    LeftDrawerComponent,
    RightDrawerComponent,
    HeaderComponent,
    FooterComponent,
    FacilityOverviewComponent,
    DragBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    DragDropModule,
    HammerModule,
    ScrollingModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerGestureConfig,
      deps: [],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
