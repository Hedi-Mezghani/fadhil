import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { Works } from 'src/app/models/works';
import { ProjectService } from 'src/app/service/project.service';
import { StorageService } from 'src/app/service/storage.service';
import { WorksService } from 'src/app/service/works.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addworks',
  templateUrl: './addworks.component.html',
  styleUrls: ['./addworks.component.css']
})
export class AddworksComponent implements OnInit {

  projectList!: Project[];
  workslist!:Works[];
  maDate = new Date();

  worksForm! : FormGroup;
 // router: any;
  constructor(
    private artserv: WorksService,
    private catserv: ProjectService,
   public  storage: StorageService,
   private router:Router,
  ) {}

  ngOnInit() {
    this.initForms();
    this.loadProject();
  }
  initForms() {
    this.worksForm = new FormGroup({
    dateJour:new FormControl(new Date()),
      nombreHeure: new FormControl(0, [Validators.required,Validators.minLength(1),]),
      description: new FormControl('', [Validators.required,Validators.minLength(2),]),
      project: new FormControl(new Project(), [Validators.required]),
    });
  }

  onSubmitForm() {
    //let task : Works = this.worksForm?.value;
    //  let task = new Works();
    //  task.description=this.worksForm.controls['description']?.value
    //  task.user=this.storage.getUser()

    // //  task.project=this.worksForm.controls['projet']?.value;
    // task.project = this.projectid;
    let task = (this.worksForm?.value as Works)

    task.user = new User();
    task.user.id = this.storage.getUser().id


    console.log( this.worksForm.value);

    console.log(task)


    this.artserv.Addworks(task).subscribe({
      next: (data) => {

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
    this.router.navigate(['/listworks']);


  }

  loadProject() {
    return (
      this.catserv.getProjects().subscribe((data) => {
        this.projectList = data;
      }),
      (err: any) => console.log(err)
    );

  }

}
