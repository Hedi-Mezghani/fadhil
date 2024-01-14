

import { Component, Inject, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileUploadActiviteService } from 'src/app/service/file-upload-activite.service';
import { ActivitePdfService } from 'src/app/service/activite-pdf.service';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-compt-activite-upload',
  templateUrl: './compt-activite-upload.component.html',
  styleUrls: ['./compt-activite-upload.component.css']
})
export class ComptActiviteUploadComponent implements OnInit {
  selectedFile:any
  filenames: string[] = [];
  utilisateurId: number;

  pdfData!:any[]
  constructor(
    public dialogref: MatDialogRef<ComptActiviteUploadComponent>,
    private http: HttpClient,
    private fileService: FileUploadActiviteService,
    private storgservice: StorageService,
    private pdfService: ActivitePdfService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.utilisateurId = data.utilisateurId;

   
   }
   public getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      "Authorization": "Bearer " + this.storgservice.getToken()
    });
    return headers;}

  ngOnInit(): void {
    this.loadFiles()
  }

  openUploadDialog(utilisateurId: number): void {
    const dialogRef = this.dialog.open(ComptActiviteUploadComponent, {
      data: { utilisateurId: utilisateurId },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any logic after the dialog is closed if needed
    });
  }

  isUserAdmin(): boolean {
    const user = this.storgservice.getUser();
    return user && user.roles && user.roles.includes('ROLE_ADMIN');
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files;

}
onSubmit(): void {
  if (this.selectedFile && this.selectedFile.length > 0) {
    const formData: FormData = new FormData();

    for (const file of this.selectedFile) {
      formData.append('files', file, file.name);
    }

    if (this.utilisateurId !== undefined && this.utilisateurId !== null) {
      formData.append('user_id', this.utilisateurId.toString());

      // Open the dialog
      const dialogRef: MatDialogRef<ComptActiviteUploadComponent> = this.dialogref;

      this.fileService.uploadFiles(this.selectedFile, this.utilisateurId).subscribe(
        response => {
          if (response && Array.isArray(response)) {
            console.log('Fichiers téléchargés avec succès:', response);
            this.filenames = response;
          } else {
            console.error('Erreur lors du téléchargement des fichiers: Réponse inattendue', response);
          }
        },
        error => {
          console.error('Erreur lors du téléchargement des fichiers:', error);
        },
        () => {
          // Logic to execute after the file upload is completed
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // Handle any logic after the dialog is closed if needed
          });
        }
      );
    } else {
      console.error('Erreur lors de la soumission : utilisateurId est indéfini ou nul.');
    }
  } else {
    console.log('Aucun fichier sélectionné.');
  }
}


getPdfData(): void {
  const userRoles = this.storgservice.getUser().roles;
  console.log('User Roles:', userRoles);

  if (userRoles && userRoles.includes('ROLE_ADMIN')) {
    this.pdfService.getPdfData().subscribe(data => {
      this.pdfData = data;
    });
  } else if (userRoles && userRoles.includes('ROLE_USER')) {
    this.pdfService.getPdfDataForUser(this.storgservice.getUser().id).subscribe(data => {
      this.pdfData = data;
    });
  } else {
    console.error('Rôle d\'utilisateur non reconnu ou aucune information d\'utilisateur disponible.');
  }
}

downloadPdf(index: number): void {
  const downloadUrl = `http://localhost:8089/api/activiterupload/download/${this.utilisateurId}/${this.filenames[index]}`;
  const headers = this.getHeaders();

  this.http.get(downloadUrl, {
    headers: headers,
    responseType: 'arraybuffer'
  }).subscribe(response => {
    const blob = new Blob([response], { type: 'application/pdf' });
    const fileUrl = URL.createObjectURL(blob);
    window.open(fileUrl, '_blank');
  }, error => {
    console.error('Erreur lors du téléchargement du fichier : ', error);
  });
}


loadFiles(): void {
  this.pdfService.getFiles(this.utilisateurId)
    .subscribe(filenames => {
      this.filenames = filenames;


    });
}


}