import { Pipe, PipeTransform } from '@angular/core';
import { Works } from '../models/works';

@Pipe({
  name: 'listWorksPipe'
})
export class ListWorksPipePipe implements PipeTransform {

  transform(works:Works[], searchCat: string): Works[] {
    if (!works || !searchCat) {
      return works;
    }
    return works.filter((works) =>
      works.user.username
        .toLocaleLowerCase()
        .includes(searchCat.toLocaleLowerCase())


    );
  }

}
