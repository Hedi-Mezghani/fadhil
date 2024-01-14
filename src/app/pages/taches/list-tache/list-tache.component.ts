import { TacheService } from 'src/app/service/tache.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/service/project.service';
import { StorageService } from 'src/app/service/storage.service';
import Swal from 'sweetalert2';
import { AddTacheComponent } from '../add-tache/add-tache.component';
import { EditTacheComponent } from '../edit-tache/edit-tache.component';
import { Client } from 'src/app/models/tache';



@Component({
  selector: 'app-list-tache',
  templateUrl: './list-tache.component.html',
  styleUrls: ['./list-tache.component.css']
})
export class ListTacheComponent implements OnInit {

  searchCat!: string;
  constructor(
    private tacheService: TacheService,
    public storage: StorageService,
    private dialog: MatDialog
  ) {}
  listTache!: Client[];
  ngOnInit() {
    this.loadProject();
  }
  loadProject = () => {
    return this.tacheService.getTaches().subscribe((data) => {
      this.listTache = data;
    });
  };
  onCreate() {
    const dialogconfig = new MatDialogConfig();
    dialogconfig.autoFocus = true;
    dialogconfig.disableClose = true;
    dialogconfig.width = '30%';
    dialogconfig.height = '65%';

    this.dialog
      .open(AddTacheComponent, dialogconfig)
      .afterClosed()
      .subscribe((res) => {
        this.loadProject();
      });
  }
  onDetail(obj: Client) {

    const dialogRef = this.dialog.open(EditTacheComponent, {
      width: '40%',
      height : '65%',
      data: obj,
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.loadProject();
    });
  }
  DeleteTache = (id: Object) => {
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
        this.tacheService.DeleteTache(id).subscribe((res) => {
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
