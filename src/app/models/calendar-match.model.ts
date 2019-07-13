import { Data } from '@angular/router';

export class CalendarMatch {

    constructor(
        public data: string,
        public time: any,
        public oponent: string,
        public score: any,
        public id: number
    ) { }
}