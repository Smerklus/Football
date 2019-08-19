import { Component, OnChanges, DoCheck, AfterContentInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges, AfterContentInit {
  title = 'FootballProj';

  ngOnInit() {
  }
  ngOnChanges() {
    console.log('changes')
  }
  ngAfterContentInit() {
    console.log('changes')
  }
  
}

