import { TeamType } from './team-type.model';
import { Role } from './role.model';

export class Player {

    constructor(
        public name: string,
        public surname: string,
        public role: Role,
        public teamType: TeamType,
        public number: number,
        public id: number
    ) { }
}