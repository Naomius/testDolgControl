import { Pipe, PipeTransform } from '@angular/core';
import {JsonType} from "../../types/books-type";

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: JsonType[], ...args: any[]): any {
    const sortField = args[0];
    const sortDirection = args[1];
    let multiplier = 1

    if (sortDirection === 'desc') {
      multiplier = -1;
    }

    value.sort((a: any, b: any) => {
      if (a[sortField] < b[sortField]) {
        return -1 * multiplier;
      } else if (a[sortField] > b[sortField]) {
        return 1 * multiplier;
      } else {
        return 0;
      }
    })

    return value;
  }

}