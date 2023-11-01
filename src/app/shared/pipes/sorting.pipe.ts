import { Pipe, PipeTransform } from '@angular/core';
import {BookType} from "../../types/books-type";

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(value: BookType[], order: "asc" | "desc" = "asc"): BookType[] {
    return value.sort((a, b) => {
      if (order === "asc") {
        return (a.title as any) - (b.title as any)
      } else if (order === "desc") {
        return (b.title as any) - (a.title as any);
      }
      return 0;
    });
  }

}
