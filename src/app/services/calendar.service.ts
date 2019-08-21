import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarMatch } from '../models/calendar-match.model';

@Injectable()
export class CalendarService{

    constructor(private http: HttpClient){    }

    getCalendarMatches(){
        return this.http.get('http://localhost:3000/calendarMatches').pipe(map(x=> x as CalendarMatch[]))
    }
    postCalendarMatch(calendarMatch){
        return this.http.post('http://localhost:3000/calendarMatches',calendarMatch).pipe(map(x=> x as CalendarMatch))
    }
    deleteCalendarMatch(id){
        return this.http.delete('http://localhost:3000/calendarMatches/'+id)
    }
    getMatchById(id){
        return this.http.get('http://localhost:3000/calendarMatches/'+id)
    }
    putMatchById(id,match){
        return this.http.put('http://localhost:3000/calendarMatches/'+id,match)
    }
}