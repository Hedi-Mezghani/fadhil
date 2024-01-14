import { Component, Inject, OnInit } from '@angular/core';
import { DossierService } from 'src/app/service/dossier.service';
import { StorageService } from 'src/app/service/storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { Cloudinary } from 'cloudinary-core';
import { PdfService } from 'src/app/service/pdf.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-bultin-de-paie-upload',
  templateUrl: './bultin-de-paie-upload.component.html',
  styleUrls: ['./bultin-de-paie-upload.component.css']
})
export class BultinDePaieUploadComponent implements OnInit {
  selectedFile:any
  filenames: string[] = [];
  utilisateurId: number;
  pdfData!:any[]
  constructor(
    public dialogref: MatDialogRef<BultinDePaieUploadComponent>,
    private http:HttpClient,
    private dossierService: DossierService,
    private fileService :FileUploadService,
    private storgservice:StorageService,
    private pdfService:PdfService,
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

    // Ajoutez l'ID de l'utilisateur à la requête directement ici
    formData.append('user_id', this.utilisateurId.toString());

    this.fileService.uploadFiles(this.selectedFile, this.utilisateurId).subscribe(
      response => {
        console.log('Fichiers téléchargés avec succès:', response);
        // Faites quelque chose avec la réponse du serveur si nécessaire
        this.filenames = response;

      },
      error => {
        console.error('Erreur lors du téléchargement des fichiers:', error);
        // Gérez les erreurs ici
      }
    );
  } else {
    console.log('Aucun fichier sélectionné.');
  }
}
getPdfData(): void {
  const userRoles = this.storgservice.getUser().roles;
  console.log('User Roles:', userRoles);

  if (userRoles && userRoles.includes('ROLE_ADMIN')) {
    // Si l'utilisateur est un administrateur, récupérez les données PDF
    this.pdfService.getPdfData().subscribe(data => {
      this.pdfData = data;
    });
  } else if (userRoles && userRoles.includes('ROLE_USER')) {
    // Si l'utilisateur est un utilisateur normal, récupérez les données PDF appropriées
    // Utilisez this.storgservice.getUser().id pour obtenir l'ID de l'utilisateur
    this.pdfService.getPdfDataForUser(this.storgservice.getUser().id).subscribe(data => {
      this.pdfData = data;
    });
  } else {
    // Gérer d'autres rôles ou aucune information d'utilisateur
    console.error('Rôle d\'utilisateur non reconnu ou aucune information d\'utilisateur disponible.');
  }
}
// downloadPdf() {
//   for (let i = 0; i < this.filenames.length; i++) {
//   const downloadUrl = http://localhost:8089/api/fileupload/download/${this.utilisateurId}/${this.filenames[i]};
//   const headers = this.getHeaders();

//   this.http.get(downloadUrl, {
//     headers: headers,
//     responseType: 'arraybuffer'
//   }).subscribe(response => {
//     const blob = new Blob([response], { type: 'application/pdf' });
//     const fileUrl = URL.createObjectURL(blob);
//     window.open(fileUrl, '_blank');
//   }, error => {
//     console.error('Erreur lors du téléchargement du fichier : ', error);
//   });
// }
// }
// loadFiles(): void {
//   this.pdfService.getFiles(this.utilisateurId)
//     .subscribe(filenames => {
//       this.filenames = filenames;
//     });
// }
downloadPdf(index: number): void {
  const downloadUrl = `http://localhost:8089/api/fileupload/download/${this.utilisateurId}/${this.filenames[index]}`;
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