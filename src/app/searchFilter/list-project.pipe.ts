import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';

@Pipe({
  name: 'listProjectPipe'
})
export class ListProjectPipePipe implements PipeTransform {

  transform(projects:Project[], searchCat: string): Project[] {
    if (!projects || !searchCat) {
      return projects;
    }
    return projects.filter((project) =>
      project.name_project
        .toLocaleLowerCase()
        .includes(searchCat.toLocaleLowerCase())
    );
  }
}
