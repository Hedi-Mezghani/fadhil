import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { BultinDePaieComponent } from '../bultin-de-paie/bultin-de-paie.component';
import { DossierService } from 'src/app/service/dossier.service';
import { StorageService } from 'src/app/service/storage.service';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { BultinDePaieUploadComponent } from '../bultin-de-paie-upload/bultin-de-paie-upload.component';
import { UserService } from 'src/app/service/user.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bultin-de-paie1',
  templateUrl: './bultin-de-paie1.component.html',
  styleUrls: ['./bultin-de-paie1.component.css']
})
export class BultinDePaie1Component implements OnInit {

  moisSelectionne!: string;
anneeSelectionnee!: number | null;
utilisateurSelectionne: any;

utilisateurSelectionneId!:number
derniereModification!: Date | null;
dossiers: any[] = [];
utilisateurId: number;
 // dialog: any;
 item1: any;
user!:User
dataSource  = new MatTableDataSource<User>();
dataArray!:User[]
selectedUserId:any;
  constructor
  (
    private http: HttpClient,
    public dialogref: MatDialogRef<BultinDePaieComponent>,
    private dossierService: DossierService,
    private dialog: MatDialog,
    private userservice :UserService,
    private storgservice:StorageService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {


   // this.utilisateurSelectionne = data.utilisateurSelectionne;
   this.utilisateurId = data.utilisateurId;
   this.user=new User()
   }

  ngOnInit(): void {
    this.getDossiers()

    this.userservice.getAllUsers().subscribe(data=>{
      this.dataArray=data
      this.dataSource.data = this.dataArray
      console.log(this.dataSource.data);

    })

    this.userservice.getUserById(1).subscribe(user => {
      this.user = user;
    });
  }

  isUserAdmin(): boolean {
    const user = this.storgservice.getUser();
    return user && user.roles && user.roles.includes('ROLE_ADMIN');
  }
  afficherDetailsUtilisateur(user: User) {

    console.log(user)
   // this.utilisateurSelectionneId = user.id;
  }
  afficherDetailsUtilisateur1(userId: number) {
    this.selectedUserId = userId;
    this.userservice.getUserDetails(userId).subscribe(
      userDetails => {
        console.log('Détails de l\'utilisateur:', userDetails);
        // Faites quelque chose avec les détails de l'utilisateur récupérés
      },
      error => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
      }
    );
  }


ajouterDossier() {
  console.log('userId',this.utilisateurId)

  if (this.moisSelectionne && this.anneeSelectionnee && this.utilisateurId) {
    const nouveauDossier = {
      nom: this.moisSelectionne,
      derniereModification: this.anneeSelectionnee,
     user_id: this.utilisateurId
    };

    this.dossierService.ajouterDossier(nouveauDossier).subscribe(
      (response) => {
        console.log('Dossier ajouté avec succès:', response);

        this.dossiers.push(response);
        this.moisSelectionne = '';
        this.anneeSelectionnee = null;
        this.utilisateurId= 0;
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du dossier:', error);

      }
    );
  } else {
    console.log('errer')
  }
}

getDossiers() {
  const userRoles = this.storgservice.getUser().roles;
  console.log('User Roles:', userRoles);

  if (userRoles && userRoles.includes('ROLE_ADMIN')) {
    this.dossierService.getDossiers().subscribe(
      (dossiers: any[]) => {
        this.dossiers = dossiers;
      },
      (error) => {
        console.error('Erreur lors de la récupération des dossiers:', error);
      }
    );
  } else if (userRoles && userRoles.includes('ROLE_USER')) {
    this.dossierService.getDossiersByUserId(this.storgservice.getUser().id).subscribe(
      (dossiers: any[]) => {
        this.dossiers = dossiers;
      },
      (error) => {
        console.error('Erreur lors de la récupération des dossiers de l\'utilisateur:', error);
      }
    );
  } else {
    console.error('Rôle d\'utilisateur non reconnu ou aucune information d\'utilisateur disponible.');
  }
}




  editerDossier(dossier: any) {
  }

  supprimerDossier(dossier: any) {
    this.dossierService.supprimerDossier(dossier.id).subscribe(
      () => {
        const index = this.dossiers.indexOf(dossier);
        if (index !== -1) {
          this.dossiers.splice(index, 1);
        }
        console.log('Dossier supprimé avec succès.');
      },
      (error) => {
        console.error('Erreur lors de la suppression du dossier:', error);
      }
    );
  }
  onCreate(dossier:any) {
    const dialogconfig = new MatDialogConfig();
    dialogconfig.autoFocus = true;
    dialogconfig.disableClose = true;
    dialogconfig.width = '65%';
    dialogconfig.height = '65%';

    dialogconfig.data = {
      utilisateurId: dossier
    };
    console.log(dossier)

    this.dialog
      .open(BultinDePaieUploadComponent, dialogconfig)
      .afterClosed()
      .subscribe(() => {
       // this.loadProject();
      });

  }

}