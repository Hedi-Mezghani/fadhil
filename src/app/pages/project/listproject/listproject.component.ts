import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/service/project.service';
import { StorageService } from 'src/app/service/storage.service';
import Swal from 'sweetalert2';
import { AddprojectComponent } from '../addproject/addproject.component';
import { EditprojectComponent } from '../editproject/editproject.component';

@Component({
  selector: 'app-listproject',
  templateUrl: './listproject.component.html',
  styleUrls: ['./listproject.component.css']
})
export class ListprojectComponent implements OnInit {

  searchCat!: string;
  constructor(
    private CatService: ProjectService,
    public storage: StorageService,
    private dialog: MatDialog
  ) {}
  listproject!: Project[];
  ngOnInit() {
    this.loadProject();
  }
  loadProject = () => {
    return this.CatService.getProjects().subscribe((data) => {
      this.listproject = data;
    });
  };
  onCreate() {
    const dialogconfig = new MatDialogConfig();
    dialogconfig.autoFocus = true;
    dialogconfig.disableClose = true;
    dialogconfig.width = '30%';
    dialogconfig.height = '65%';

    this.dialog
      .open(AddprojectComponent, dialogconfig)
      .afterClosed()
      .subscribe((res) => {
        this.loadProject();
      });
  }
  onDetail(obj: Project) {
    const dialogRef = this.dialog.open(EditprojectComponent, {
      width: '40%',
      data: obj,
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.loadProject();
    });
  }
  Deleteproject = (id: Object) => {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le !',
    }).then((result) => {
      if (result.isConfirmed) {
        this.CatService.DeleteProject(id).subscribe((res) => {
          this.loadProject();
        });
        Swal.fire(
          'Supprimé!',
          'La suppression a été effectuée avec succées.',
          'success'
        );
      }
    });
  };

}
