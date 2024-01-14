import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { Works } from 'src/app/models/works';
import { ProjectService } from 'src/app/service/project.service';
import { WorksService } from 'src/app/service/works.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editworks',
  templateUrl: './editworks.component.html',
  styleUrls: ['./editworks.component.css']
})
export class EditworksComponent implements OnInit {

  id: object;
  worksForm!: FormGroup;
  nombreHeure!: string;
  description!: string;
  dateJour!:string;
  projectList!: Project[];

  project!: Project;
  user!:User

  constructor(
    private formbuilder: FormBuilder,
    private catserv:ProjectService,
    private CatService: WorksService,
    public dialogref: MatDialogRef<EditworksComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.id = data.id;
    this.nombreHeure=data.nombreHeure;
    this.description=data.description;
    this.dateJour=data.dateJour;
    this.project=data.project;
    this.user=data.user;
  }
  cat: Works = new Works();
  ngOnInit() {
    this.initForms();
    this.loadProject();
  }
  initForms() {
    this.worksForm = this.formbuilder.group({
      id: this.id,

      nombreHeure:this.nombreHeure,
      description:this.description,
       project:this.project,
      dateJour:this.dateJour,
      user:this.user

    });
  }
  onSubmitForm() {
    const formValue = this.worksForm.value;
    const newCat: Works = new Works();
    newCat.id = formValue['id'];
   newCat.project = formValue['project'];
     newCat.description = formValue['description'];
     newCat.dateJour = formValue['dateJour'];
     newCat.nombreHeure = formValue['nombreHeure'];
     newCat.user = new User();
     newCat.user.id = formValue['user']['id'];

    this.CatService.UpdateWorks(newCat.id, newCat).subscribe((data) => {
      this.cat = data;
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
  }

    loadProject() {
    return (
      this.catserv.getProjects().subscribe((data) => {
        this.projectList = data;
        console.log(data)
      }),
      (err: any) => console.log(err)
    );
    }

}
