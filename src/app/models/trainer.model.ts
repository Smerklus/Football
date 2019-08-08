import { TeamType } from './team-type.model';

export class Trainer {

    constructor(
        public name: string,
        public surname: string,
        public position: string,
        public teamType: TeamType,
        public id: number
    ) { }
}