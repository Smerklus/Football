import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
export interface PageHeader {
  value: string,
  viewValue: string
}
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  nameHeader: any[]=[];

  pageHeaders: PageHeader[] = [
    { value: "", viewValue: "Новости" },
    { value: "team", viewValue: "Команды" },
    { value: "calendar", viewValue: "Календарь" },
    { value: "edit_calendar", viewValue: "Форма матча" },
    { value: "statistic", viewValue: "Статистика" },
    { value: "contacts", viewValue: "Контакты" },
    { value: "trainers_panel", viewValue: "Тренерский состав" },
    { value: "control_panel", viewValue: "Состав команды" },
    { value: "main", viewValue: "РИВ ГОШ" },
    { value: "d", viewValue: "РИВ ГОШ - Д" },
  ]

  constructor(public activatedRoute: ActivatedRoute) {
    let urlPath = activatedRoute.snapshot.url;
    urlPath.forEach(urlSegment => {
      this.nameHeader.push(this.pageHeaders.find(header => {
        return header.value == urlSegment.path;
      }))
    })
    console.log(this.nameHeader)
  }

  ngOnInit() {
  }

}
