import { PipeTransform, Pipe } from '@angular/core';


@Pipe({
    name: 'timePipe'
})
export class TimePipe implements PipeTransform{

    transform(value:number){
        if (value > -1 && value <10){
            return '0'+value 
        }
    }
}