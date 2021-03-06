import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamComponent } from './team/team.component';
import { MainComponent } from './main/main.component';
import { ControlComponent } from './control/control.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MatchCompositionComponent } from './statistic/match-composition/match-composition.component';
import { StatisticComponent } from './statistic/statistic.component';
import { GoalsComponent } from './statistic/goals/goals.component';
import { PassesComponent } from './statistic/passes/passes.component';
import { RedCardComponent } from './statistic/red-card/red-card.component';
import { YellowCardComponent } from './statistic/yellow-card/yellow-card.component';
import { EditCalendarComponent } from './calendar/edit-calendar/edit-calendar.component';
import { ProtocolComponent } from './protocol/protocol.component';
import { TrainersControlComponent } from './trainers-control/trainers-control.component';
import { NewsComponent } from './news/news.component';

const statisticRoutes: Routes = [
  { path: 'match_composition', component: MatchCompositionComponent },
  { path: 'goals', component: GoalsComponent },
  { path: 'passes', component: PassesComponent },
  { path: 'red_card', component: RedCardComponent },
  { path: 'yellow_card', component: YellowCardComponent },
]

const appRoutes: Routes = [
  { path: 'team', component: TeamComponent },
  { path: 'team/trainers_panel/:teamType', component: TrainersControlComponent },
  { path: 'team/control_panel', component: ControlComponent },
  { path: 'team/control_panel/:id', component: ControlComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'calendar/edit_calendar/:id', component: EditCalendarComponent },
  { path: 'calendar/edit_calendar', component: EditCalendarComponent },
  { path: 'protocol/:id', component: ProtocolComponent },
  { path: 'statistic', component: StatisticComponent, children: statisticRoutes },
  { path: 'news', component: NewsComponent},
  { path: '', component: MainComponent },
  
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
