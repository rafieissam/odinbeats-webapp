import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationToMins',
  standalone: true
})
export class DurationToMinsPipe implements PipeTransform {

  transform(value: number | undefined, ...args: unknown[]): string {
    if (!value) value = 0;
    let secs: any = value % 60;
    if (secs < 10) secs = '0' + secs;
    let mins: any = Math.floor(value / 60);
    if (mins >= 60) {
      mins = mins % 60;
      if (mins < 10) mins = '0' + mins;
      let hours = Math.floor(value / 3600);
      return `${hours}:${mins}:${secs}`;
    }
    return `${mins}:${secs}`;
  }

}
