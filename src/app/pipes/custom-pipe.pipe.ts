import { LowerCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe',
  pure: true
})
export class CustomPipePipe implements PipeTransform {

  transform(values: string[], args: string): string[] {
    if (!args) return values;
    let result: string[] = [];
    for (let value of values) {
      const lowerCasePipe = new LowerCasePipe();
      const valueAux = lowerCasePipe.transform(value);
      if (valueAux.indexOf(args) > -1) {
        result = [...result, value];
      }
    }
    return result.length > 0 ? result : ['No hay coincidencias'];
  }

}
