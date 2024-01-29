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
    let mins = Math.floor(value / 60);
    return `${mins}:${secs}`;
  }

}
