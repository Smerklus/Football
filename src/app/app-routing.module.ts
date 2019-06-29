import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamComponent } from './team/team.component';
import { MainComponent } from './main/main.component';
import { ControlComponent } from './control/control.component';

const appRoutes: Routes = [
  { path: 'team', component: TeamComponent },
  {path: 'control_panel', component: ControlComponent},
  {path: '', component: MainComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
