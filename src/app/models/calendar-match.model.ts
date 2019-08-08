import { Data } from '@angular/router';
import { TeamType } from './team-type.model';
import { GoalsList } from './goals-list.model';

export class CalendarMatch {

    constructor(
        public date: string,
        public time: string,
        public teamType: TeamType,
        public oponent: string,
        public score: any,
        public goalsList: GoalsList,
        public composition: any,
        public id: number
    ) { }
}