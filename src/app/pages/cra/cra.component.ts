import { Component, Inject, NgModule, OnInit, ViewEncapsulation } from '@angular/core';

import { DocumentService } from 'src/app/service/document.service';
import * as moment from 'moment';
import { TacheService } from 'src/app/service/tache.service';
import { Client } from 'src/app/models/tache';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from 'src/app/models/project';
import { CraService } from 'src/app/service/cra.service';
import { CraData } from 'src/app/models/craData';

import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { TotalService } from 'src/app/service/total.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { StorageService } from 'src/app/service/storage.service';
import { PdfService } from 'src/app/service/pdf.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { SharedDataServiceService } from 'src/app/service/shared-data-service.service';
import { ToastrService } from 'ngx-toastr';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';




export interface Commentaire {
  id?: number;
  comment: string;
}

@Component({
  selector: 'app-cra',
  templateUrl: './cra.component.html',
  styleUrls: ['./cra.component.css', './cra.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class CraComponent implements OnInit {
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;
  tickInterval = 1;
  selectedFile: any;
  comments: any;
  comment: string = '';
  router: any;
  dates: moment.Moment[] = [];
  clients: Client[] = [];
  projects: Project[] = [];
  choixClient?: string = '';
  choixProjet?: string = '';

  selectedMonth?: number;
  selectedYear!: number;
  production: number = 0;
  absence: number = 0;
  month: number = 0;
  year: number = 0;

  currentMonth!: string;
  currentYear!: string;
  daysInMonth: { date: number; day: string }[] = [];
  firstDayOfMonthIndex: number = 0;
  currentDate: Date = new Date();

  userInfo: any;
  userId!: number;
  user!: User;
  textInputs: string[] = [];
  maxProduction!: number;
  percentage!: number;

  selectedFiles: any;

  filenames: string[] = [];
  utilisateurId!: number;
  pdfUrl?: string;
  pdfData!: any[];
  selectedUserId: any;

  dataArray!: User[];
  users!: Observable<Array<User>>;
  dataSource = new MatTableDataSource<User>();

  utilisateur!: User;
  publicId: string[] = [];

  isLoggedIn = false;
  isLoginFailed = false;

  roles: any;
  successMessage: boolean = false;
  errorMessage: boolean = false;
  craData?: CraData[] = [];
  searchedCraData: CraData[] = [];
  pdfMake = pdfFonts.pdfMake.vfs;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private tacheService: TacheService,
    private projectService: ProjectService,
    private craService: CraService,
    private totalService: TotalService,
    private storgService: StorageService,
    private pdfService: PdfService,
    private userservice: UserService,
    private sharedDataService: SharedDataServiceService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.loadTaches();
    this.loadProjects();
    this.setCurrentMonth();
  }

  public getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      Authorization: 'Bearer ' + this.storgService.getToken(),
    });
    return headers;
  }

  ngOnInit(): void {
    this.loadTaches();
    this.loadProjects();
    this.setCurrentMonth();
    this.craData;

    this.totalService.production$.subscribe((total) => {
      this.production = total;
    });

    this.totalService.absence$.subscribe((total) => {
      this.absence = total;
      this.value = this.production;
    });

    if (this.storgService.isLoggedIn()) {
      this.isLoggedIn = true;
      const user = this.storgService.getUser();

      if (user) {
        this.roles = user.roles;
        this.utilisateurId = user.id;
        console.log('l\'utilisateur id est:', this.utilisateurId);
      } else {
        console.error('L\'utilisateur est null.');
      }
    }

    this.route.data.subscribe((data) => {
      this.craData = data['craData'];
    });

    this.sharedDataService.craData$.subscribe((craData) => {
      this.craData = craData;
    });

    this.route.queryParams.subscribe((params) => {
      const craData = JSON.parse(params['craData']);
      if (craData) {
        this.craData = craData;
      }
    });
  }

  gotoCommentList() {
    this.router.navigate(['/cra']);
  }

  loadTaches() {
    this.tacheService.getTaches().subscribe((clients) => {
      this.clients = clients;
    });
  }

  loadProjects() {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }


  onSubmitCra(activityFormValue: any): void {
    const textInputs = this.textInputs;
    const comment = this.comment;
    const choixClient = this.choixClient;
    const choixProjet = this.choixProjet;
  
    // Nouveau code pour définir la date et l'userId
    const date = new Date(); // Obtenez la date actuelle
    const userId = this.utilisateurId; // Utilisez l'ID de l'utilisateur actuel
  
    if (activityFormValue && activityFormValue.textInputs) {
      // Vérifiez si les valeurs sont définies avant de les utiliser
      const newCraData: CraData = {
        choixClient,
        choixProjet,
        textInputs,
        comment,
        date,
        userId,
        month: this.month, // Vous pouvez également récupérer ces valeurs depuis la classe
        year: this.year
      };
  
      this.craService.createCraData(newCraData).subscribe(
        response => {
          console.log('Réponse du backend :', response);
          this.openSuccessModal();
          this.craData = [newCraData];
        },
        
        error => {
          console.error('Erreur lors de l\'enregistrement des données :', error);
          this.openErrorModal();
        }
      );
  
      this.updateTotals();
    } else {
      console.error('activityFormValue.textInputs is undefined or null');
    }
  }
  
  // ... (le reste du code reste inchangé)
  
  resetTable(): void {
    // Réinitialiser les valeurs dans le tableau existant
    this.textInputs.fill('');
    this.updateTotals();
  }
  
  // ... (le reste du code reste inchangé)
  

      setCurrentMonth() {
        this.currentMonth = this.currentDate.toLocaleString('default', { month: 'long' });
        this.currentYear = this.currentDate.getFullYear().toString();
        this.firstDayOfMonthIndex = this.currentDate.getDay() - 1; // -1 to adjust for Sunday being 0
        const daysInMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
        this.daysInMonth = Array.from({ length: daysInMonth }, (_, i) => {
          const date = i + 1;
          const day = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), date).toLocaleString('default', { weekday: 'short' });
          return { date, day };
        });
        this.textInputs = new Array(daysInMonth).fill('');
      }

      previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.setCurrentMonth();
        this.setMonthYear(); 
      }

      nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.setCurrentMonth();
        this.setMonthYear(); 
      }

      setMonthYear() {
        this.month = this.currentDate.getMonth(); // Mettre à jour le mois
        this.year = this.currentDate.getFullYear(); // Mettre à jour l'année
      }      

      exproterVente(){
    
        this.craService.imprimerVente().subscribe(x=>{
          
          const blob = new Blob([x], {type: "application/pdf"});
          const nav = (window.navigator as any);
        // Vous pouvez appeler des services pour envoyer ces données au serveur si nécessaire
          if(window.navigator && (window.navigator as any).msSaveOrOpenBlob){
            nav.msSaveOrOpenBlob(blob);
            return;
          }
          const data =window.URL.createObjectURL(blob);
          const link =document.createElement('a');
          link.href= data;
          link.download= "vente.pdf"
          link.dispatchEvent(new MouseEvent('click', {bubbles:true, cancelable:true, view:window}));
          setTimeout(function(){
            window.URL.revokeObjectURL(data);
          },100) 
      });
      }
 
      
      
      trackByFn(index: number, item: any): any {
        return index; // or provide a unique identifier from your data
     }
  
     
      
      isInvalidInput(value: string): boolean {
        const validValues = ['0', '1', '0.5'];
        const trimmedValue = value.trim();
      
        // Vérifie si la valeur n'est pas vide et si elle n'est pas incluse dans le tableau validValues
        return trimmedValue !== '' && !validValues.includes(trimmedValue);
      }


      updateTotals(): void {
        let totalProduction = 0;
        let totalAbsence = 0;
    
        for (const inputValue of this.textInputs) {
          const numericValue = parseFloat(inputValue);
    
          if (!isNaN(numericValue)) {
            totalProduction += numericValue;
    
            if (numericValue === 0) {
              totalAbsence += 1;
            } else if (numericValue === 0.5) {
              totalAbsence += 0.5;
            }
          }
          this.totalService.updateProduction(totalProduction);
        }
    
        // Mettez à jour les observables avec les totaux calculés
        this.totalService.updateProduction(totalProduction);
        this.totalService.updateAbsence(totalAbsence);
      }
      onInputChange(): void {
        // Appelez la fonction updateTotals() à chaque changement dans les valeurs des jours
        this.updateTotals();
      }

      onPercentageChange() {
        // Calculer la nouvelle valeur en fonction de la %
        this.value = (this.percentage / 100) * (this.max - this.min) + this.min;
        // Reste de votre logique...
      }

      isUserAdmin(): boolean {
        const user = this.storgService.getUser();
        return user && user.roles && user.roles.includes('ROLE_ADMIN');
      }
    
      onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0] as File;
      }
      onUpload(event: any): void {
        event.preventDefault();
      
        if (this.selectedFile) {
          this.documentService.uploadDocument(this.selectedFile).subscribe(
            (response) => {
              // Gérez la réponse après le téléversement réussi
              console.log('Document uploaded successfully:', response);
            },
            (error) => {
              // Gérez les erreurs en cas de problème de téléversement
              console.error('Error uploading document:', error);
      
              if (error.status === 401) {
                console.error('Unauthorized. Check token or authentication.');
              } else {
                console.error('Other error. Check server and request.');
              }
            }
          );
        } else {
          // Gérez le cas où aucun fichier n'est sélectionné
          console.error('No file selected for upload');
        }
      }
      
      onSubmit(): void {
        console.log('onSubmit() called');
        console.log('utilisateurId:', this.utilisateurId);
      
        if (this.selectedFile) {
          const formData: FormData = new FormData();
          formData.append('file', this.selectedFile, this.selectedFile.name);
          formData.append('userId', this.utilisateurId.toString());
      
          this.craService.uploadFile(this.selectedFile, this.utilisateurId).subscribe(
            response => {
              console.log('Fichier téléchargé avec succès:', response);
              // Faites quelque chose avec la réponse du serveur si nécessaire
              this.filenames = response;
             this.showSuccess();
            },
            error => {
              console.error('Erreur lors du téléchargement du fichier:', error);
              this.showError();
            }
          );
        } else {
          console.log('Aucun fichier sélectionné.');
          this.showError();
        }
      }
      
    getPdfData(): void {
      const userRoles = this.storgService.getUser().roles;
      console.log('User Roles:', userRoles);
    
      if (userRoles && userRoles.includes('ROLE_ADMIN')) {
        // Si l'utilisateur est un administrateur, récupérez les données PDF
        this.pdfService.getPdfData().subscribe(data => {
          this.pdfData = data;
        });
      } else if (userRoles && userRoles.includes('ROLE_USER')) {
        // Si l'utilisateur est un utilisateur normal, récupérez les données PDF appropriées
        // Utilisez this.storgservice.getUser().id pour obtenir l'ID de l'utilisateur
        this.pdfService.getPdfDataForUser(this.storgService.getUser().id).subscribe(data => {
          this.pdfData = data;
        });
      } else {
        // Gérer d'autres rôles ou aucune information d'utilisateur
        console.error('Rôle d\'utilisateur non reconnu ou aucune information d\'utilisateur disponible.');
      }
    }

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

    afficherDetailsUtilisateur(user: User) {
      this.router.navigate(['/user-details', user.id]);
    }
    afficherDetailsUtilisateur1(userId: number) {
      this.selectedUserId = userId;
      this.userservice.getUserDetails(userId).subscribe(
        userDetails => {
          console.log('Détails de l\'utilisateur:', userDetails);
        },
        error => {
          console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
        }
      );
    }
    
    
    showUserDetails(user: User) {
      this.router.navigate(['/user-details', user.id]);
    }

    openSuccessModal(): void {
      const dialogRef = this.dialog.open(SuccessModalComponent, {
        width: '250px',
        data: { message: 'Enregistrement réussi !' }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('La modale de succès est fermée.');
      });
    }
    
    openErrorModal(): void {
      const dialogRef = this.dialog.open(ErrorModalComponent, {
        width: '250px',
        data: { message: 'Échec de l\'enregistrement. Veuillez réessayer.' }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('La modale d\'erreur est fermée.');
      });
    }
    

    updateCraData(searchResults: CraData[]): void {
      console.log('Données reçues dans updateCraData:', searchResults);
      this.craData = searchResults;
    }
    
    showSuccess() {
      this.toastr.success('Les informations sont envoyé avec success!');
    }
  
    showError() {
      this.toastr.error('Erreur : Aucun données sélectionnés.');
    }
    showToast() {
      this.toastr.success('Bonjour !')
    }

    generatePdf(): void {
      const docDefinition = {
        content: [
          { text: 'CRA Table', style: 'header' },
          { text: `Selected Year: ${this.choixProjet}`, style: 'subheader' },
          { text: `Selected Month: ${this.choixClient}`, style: 'subheader' },
          { text: `Selected Year: ${this.currentYear}`, style: 'subheader' },
          { text: `Selected Month: ${this.currentMonth}`, style: 'subheader' },
          { text: '\n' },
          {
            table: {
              headerRows: 1,
              widths: ['5%', ...Array.from({ length: this.daysInMonth.length }, () => '3%')], // Adjusted widths for each column
              body: [
                ['Day', ...this.daysInMonth.map(day => day.day)],
                ['', ...this.daysInMonth.map(day => day.date)],
                ['Input', ...this.textInputs]
              ],
              style: 'table' // Apply the 'table' style to the table
            }

           
          }
        ],
        styles: {
          header: {
            fontSize: 10, // Adjusted font size for header
            bold: true
          },
          subheader: {
            fontSize: 8, // Adjusted font size for subheader
            bold: true,
          //  margin: [0, 5, 0, 0] as [number, number, number, number] // Adjusted margin for subheader
          },
          table: {
            fontSize: 3, // Adjusted font size for the table
            bold: true,
            margin: [0, 5, 0, 15] as [number, number, number, number], // Adjusted margin for the table
            fillColor: '#F2F2F2' // Background color for the table
          }
        },
        
        page: {
          size: 'A4'
        }
      };
    
      pdfMake.createPdf(docDefinition).download('craTable.pdf');
    }
    

    }