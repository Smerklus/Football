import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../services/calendar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.scss']
})
export class ProtocolComponent implements OnInit {

id:number;
currentMatch;

  constructor(public calendarService: CalendarService, private activatedRout: ActivatedRoute) { 
  this.id = activatedRout.snapshot.params['id'];
  calendarService.getCalendarMatches().subscribe(x=>{
    x.forEach(currentMatch=>{
      if (currentMatch.id == this.id) this.currentMatch=currentMatch;
    })
  console.log(this.currentMatch)
  })
  }

  ngOnInit() {
  }

}
