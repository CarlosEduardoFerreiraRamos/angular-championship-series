import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchService } from './services/match-service/match.service';
import { InterceptorServiceModule } from './services/interceptor-service/interceptor-service.module';
import { BackEndModule } from './mock-back-end/back-end/back-end.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BackEndModule,
    MatToolbarModule,
    MatButtonModule,
    MatNativeDateModule,
    InterceptorServiceModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [MatchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
