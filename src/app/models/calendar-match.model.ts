import { Data } from '@angular/router';

export class CalendarMatch {

    constructor(
        public date: string,
        public time: string,
        public oponent: string,
        public score: any,
        public composition: any,
        public id: number
    ) { }
}