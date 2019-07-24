import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MaterialModule } from './material.module';
import { TeamComponent } from './team/team.component';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ControlComponent } from './control/control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
import { StatisticComponent } from './statistic/statistic.component';
import { MatchCompositionComponent } from './statistic/match-composition/match-composition.component';
import { YellowCardComponent } from './statistic/yellow-card/yellow-card.component';
import { RedCardComponent } from './statistic/red-card/red-card.component';
import { GoalsComponent } from './statistic/goals/goals.component';
import { PassesComponent } from './statistic/passes/passes.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerService } from './services/player.service';
import { EditCalendarComponent } from './calendar/edit-calendar/edit-calendar.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { TimePipe } from './time.pipe';
import { GameScorePickerComponent } from './game-score-picker/game-score-picker.component';
import { CalendarService } from './services/calendar.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ProtocolComponent } from './protocol/protocol.component';
import { DeleteDialogPlayerComponent } from './delete-dialog-player/delete-dialog-player.component';
import { TrainersControlComponent } from './trainers-control/trainers-control.component';
import { TrainerService } from './services/trainers.service';


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
    PassesComponent,
    EditCalendarComponent,
    TimePickerComponent,
    TimePipe,
    GameScorePickerComponent,
    DeleteDialogComponent,
    ProtocolComponent,
    DeleteDialogPlayerComponent,
    TrainersControlComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
  ],
  providers: [PlayerService,CalendarService,TrainerService],
  bootstrap: [AppComponent],
  entryComponents:[DeleteDialogComponent,DeleteDialogPlayerComponent]
})
export class AppModule { }
