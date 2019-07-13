import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';
import { map } from 'rxjs/operators';

@Injectable()
export class PlayerService{

    constructor(private http: HttpClient){    }

    getPlayers(){
        return this.http.get('http://localhost:3000/players').pipe(map(x=> x as Player[]))
    }
    postPlayer(player){
        return this.http.post('http://localhost:3000/players',player).pipe(map(x=> x as Player))
    }
    deletePlayer(id){
        return this.http.delete('http://localhost:3000/players/'+id)
    }
}