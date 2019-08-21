import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { TeamType } from 'src/app/models/team-type.model';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/models/player.model';
import { ActivatedRoute } from '@angular/router';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-composition-form',
  templateUrl: './composition-form.component.html',
  styleUrls: ['./composition-form.component.scss']
})
export class CompositionFormComponent implements OnInit {

  teamTypes: TeamType[] = [
    { value: 'main', viewValue: 'РИВ ГОШ' },
    { value: 'd', viewValue: 'РИВ ГОШ - д' },
  ];

  @Input() parentForm: FormGroup;
  mainAllPurpose: any;
  selectedTeamType: any = '';
  @Input() inputPlayers: Player[] = [];
  @Output() onChangeMainAllPurpose = new EventEmitter();
  
  id: string;
  currentMatch: any;

  constructor(public playerApi: PlayerService, public activatedRoute: ActivatedRoute, public calendarApi: CalendarService) {
    activatedRoute.paramMap.subscribe(x => {

      this.id = x.get('id');
      if (this.id) {
        calendarApi.getMatchById(this.id).subscribe(x => {
          this.currentMatch = x;
          if (this.currentMatch) {
            this.mainAllPurpose = this.currentMatch.composition;
            if (this.currentMatch.teamType) {
              this.selectedTeamType = this.currentMatch.teamType;
              this.parentForm.patchValue({
                compositionData: {
                  teamType: this.teamTypes.find(z => z.value == this.currentMatch.teamType.value),
                },
              })
            };
            this.parentForm.patchValue({
              compositionData: {
                teamType: this.currentMatch.teamType,
              }
            })
          }
        })
      }
    })
  }
  ngOnInit() {
  }

  isDisabledSelect() {
    if (this.parentForm.value.compositionData.teamType.value && this.mainAllPurpose)
      return this.mainAllPurpose.length > 0;
  }
  public changeTeamType(event): void {
    this.selectedTeamType = event.value;
  }
  isPlayerChecked(inputPlayers) {
    if (this.currentMatch && this.currentMatch.composition) {
      return this.currentMatch.composition.some(x => x.id == inputPlayers.id)
    }
  }
  isDisabledAllPurpose(inputPlayers) {
    if (this.mainAllPurpose) {
      let allPurposes = []
      this.mainAllPurpose.forEach(x => {
        if (x.role.value == 'all-purpose') {
          allPurposes.push(x)
        }
      })
      let isChecked = this.mainAllPurpose.some(z => z.id == inputPlayers.id)
      if (allPurposes.length > 3 && !isChecked) {
        return true;
      }
      else {
        return false;
      }
    }
  }
  isDisabledGoalkeepers(inputPlayers) {
    if (this.mainAllPurpose) {
      let goalkeepers = []
      this.mainAllPurpose.forEach(x => {
        if (x.role.value == 'goalkeeper') {
          goalkeepers.push(x)
        }
      })
      let isChecked = this.mainAllPurpose.some(z => z.id == inputPlayers.id)
      if (goalkeepers.length > 0 && !isChecked) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  onChange(event, inputPlayers) {

    console.log(event)
    console.log(inputPlayers)
    if (event.checked) {
      if (!this.mainAllPurpose) {
        this.mainAllPurpose = [];
      }
      this.mainAllPurpose.push(inputPlayers)
    }
    else {
      let indexSameinputPlayers = this.mainAllPurpose.findIndex(x => x.id == inputPlayers.id)
      this.mainAllPurpose.splice(indexSameinputPlayers, 1)
    }
    this.onChangeMainAllPurpose.emit(this.mainAllPurpose);
  }
  compareTeamType(type1: any, type2: any): boolean {
    if (type1.value === type2.value) {
      return true;
    }
    else {
      return false;
    }
  }
}