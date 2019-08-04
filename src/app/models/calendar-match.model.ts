import { Data } from '@angular/router';
import { TeamType } from './team-type.model';

export class CalendarMatch {

    constructor(
        public date: string,
        public time: string,
        public teamType: TeamType,
        public oponent: string,
        public score: any,
        public goalList: any,
        public composition: any,
        public id: number
    ) { }
}