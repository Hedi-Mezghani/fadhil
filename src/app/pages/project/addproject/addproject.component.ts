import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/service/project.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})

export class AddprojectComponent implements OnInit {
  cat: Project = new Project();
  projectForm!: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private CatService: ProjectService,
    public dialogref: MatDialogRef<AddprojectComponent>
  ) {}

  ngOnInit() {
    this.initForms();
  }
  initForms() {
    this.projectForm = this.formbuilder.group({
      name_project: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      description_projet: new FormControl('', [Validators.required]),
    });
  }  
  get name_project() {
    return this.projectForm.get('name_project');
  }

  get description_projet() {
    return this.projectForm.get('description_projet');
  }
  onSubmitForm() {
    let categ: Project = this.projectForm?.value;
    console.log(categ)
    this.CatService.AddProject(categ).subscribe({
      next: (data) => {
        this.dialogref.close();
        Swal.fire(
          "L'insertion a été effectuée avec succès!",
          'Cliquer içi!',
          'success'
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onFileChanged(event: any) {
    console.log(event.target.files[0].name);
    this.cat.description_projet = 'projects/' + event.target.files[0].name;
  }

}

