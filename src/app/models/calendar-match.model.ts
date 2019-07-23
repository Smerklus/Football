import { Data } from '@angular/router';

export class CalendarMatch {

    constructor(
        public date: string,
        public time: {
            hour: number,
            minute: number
        },
        public oponent: string,
        public score: any,
        public id: number
    ) { }
}