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
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
import { StatisticComponent } from './statistic/statistic.component';
import { MatchCompositionComponent } from './statistic/match-composition/match-composition.component';
import { YellowCardComponent } from './statistic/yellow-card/yellow-card.component';
import { RedCardComponent } from './statistic/red-card/red-card.component';
import { GoalsComponent } from './statistic/goals/goals.component';
import { PassesComponent } from './statistic/passes/passes.component';


@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    MainComponent,
    ControlComponent,
    CalendarComponent,
    StatisticComponent,
    MatchCompositionComponent,
    YellowCardComponent,
    RedCardComponent,
    GoalsComponent,
    PassesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MaterialModule,
    FormsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
