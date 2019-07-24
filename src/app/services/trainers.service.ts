import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Trainer } from '../models/trainer.model';

@Injectable()
export class TrainerService{

    constructor(private http: HttpClient){    }

    getTrainers(){
        return this.http.get('http://localhost:3000/trainers').pipe(map(x=> x as Trainer[]))
    }
    postTrainer(trainer){
        return this.http.post('http://localhost:3000/trainers',trainer).pipe(map(x=> x as Trainer))
    }
    deleteTrainer(id){
        return this.http.delete('http://localhost:3000/trainers/'+id)
    }
    putTrainerById(id,trainer){
        return this.http.put('http://localhost:3000/trainers/'+id,trainer)
    }
    getTrainerById(id){
        return this.http.get('http://localhost:3000/trainers/'+id)
    }
}