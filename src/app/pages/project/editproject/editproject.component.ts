import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/service/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.css']
})
export class EditprojectComponent implements OnInit {

  id: object;
  projectForm!: FormGroup;
  name_project!: string;
  description_projet!: string;

  constructor(
    private formbuilder: FormBuilder,
    private CatService: ProjectService,
    public dialogref: MatDialogRef<EditprojectComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.id = data.id;
    this.name_project = data.name_project;
    this.description_projet = data.description_projet;
  }
  cat: Project = new Project();
   listproject!:Project[]
  ngOnInit() {
    this.initForms();
  }
  loadProject = () => {
    return this.CatService.getProjects().subscribe((data) => {
      this.listproject = data;
      console.log(data)
    });}

  initForms() {
    this.projectForm = this.formbuilder.group({
      id: this.id,
      name_project: this.name_project,
      description_projet: this.description_projet,
    });
  }
  onSubmitForm() {
    const formValue = this.projectForm.value;
    const newCat: Project = new Project();
    newCat.id = formValue['id'];
    newCat.name_project = formValue['name_project'];
    newCat.description_projet = formValue['description_projet'];

    this.CatService.UpdateProject(newCat.id, newCat).subscribe((data) => {
      this.cat = data;
      this.loadProject()
    });
    this.dialogref.close();
    Swal.fire(
      'La modification a été effectuée avec succès!',
      'Cliquer içi!',
      'success'
    );
  }
  onFileChanged(event: any) {
    console.log(event.target.files[0].name);
    this.cat.description_projet = 'categories/' + event.target.files[0].name;
  }


}
