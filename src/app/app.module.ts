import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MaterialModule } from './material.module';
import { TeamComponent } from './team/team.component';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ControlComponent } from './control/control.component';


@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    MainComponent,
    ControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
