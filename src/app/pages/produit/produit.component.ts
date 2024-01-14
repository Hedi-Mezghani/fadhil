
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogueCraComponent } from '../dialogue-cra/dialogue-cra.component';
import { FormControl } from '@angular/forms';

import * as moment from 'moment';
import { CraService } from 'src/app/service/cra.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';
import { CraData } from 'src/app/models/craData';
import { Router } from '@angular/router';
import { CraComponent } from '../cra/cra.component';
import { SharedDataServiceService } from 'src/app/service/shared-data-service.service';



export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
export interface PeriodicElement {
  name: string;
  state: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Janvier', state: ""},
  {name: 'Fevrier', state:"" },
  {name: 'Mars', state:"" },
  {name: 'Avril', state:"" },
  {name: 'Mai', state:""},
  {name: 'Juin', state:"" },
  {name: 'Juillet', state:""},
  {name: 'Out', state:"" },
  {name: 'Septembre', state:"" },
  {name: 'Octobre', state:"" },
  {name: 'Novembre', state:"" },
  {name: 'Decembre', state:"" }
];
@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css','./produit.components.scss'],

})
export class ProduitComponent implements OnInit {
  currentMonth!: string;
  daysInMonth: { date: number, day: string }[] = [];
  firstDayOfMonthIndex: number = 0;
  currentDate: Date = new Date();

  selectedMonth?: number; // Le mois sélectionné
  selectedYear?: number; // L'année sélectionnée
  selectedUser?:User;

  users: User[] = []; 
  craData?: CraData[];  // Déclarez craData comme un tableau de CraData


  years: number[]; // Liste des années
 
  production?: number = 0; // Ajoutez cette déclaration
  searchedData: CraData[] = [];


  choixClient?: string='';
  choixProjet?: string='';
  constructor(public dialog: MatDialog,private craService: CraService,private userService:UserService,private sharedDataService:SharedDataServiceService, private router: Router) {
    this.years = this.getYearsRange(2000, 2050); 
  }
 
  date = new FormControl(moment());
  months = [
    { value: 1, viewValue: 'Janvier' },
    { value: 2, viewValue: 'Février' },
    { value: 3, viewValue: 'Mars' },
    { value: 4, viewValue: 'Avril' },
    { value: 5, viewValue: 'Mai' },
    { value: 6, viewValue: 'Juin' },
    { value: 7, viewValue: 'Juillet' },
    { value: 8, viewValue: 'Août' },
    { value: 9, viewValue: 'Septembre' },
    { value: 10, viewValue: 'Octobre' },
    { value: 11, viewValue: 'Novembre' },
    { value: 12, viewValue: 'Décembre' }
  ];



  displayedColumns: string[] = ['name', 'weight'];
  dataSource = ELEMENT_DATA;
  @ViewChild(CraComponent) craComponent!: CraComponent;
 
  ngOnInit(): void {
    this.getUsers(); // Appeler la méthode pour récupérer les utilisateurs au chargement du composant
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogueCraComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  searchByDate() {
    // Utiliser this.selectedMonth et this.selectedYear pour rechercher les données
    console.log('Mois sélectionné : ', this.selectedMonth);
    console.log('Année sélectionnée : ', this.selectedYear);
    // Appelez ici votre méthode pour rechercher les données en fonction des sélections
  }

  searchByDates() {
    if (this.selectedMonth && this.selectedYear && this.selectedUser) {
      this.craService.getCraDataByYearAndMonth(this.selectedYear, this.selectedMonth).subscribe(
        (craData) => {
          console.log('Données reçues du service :', craData);
          this.searchedData = craData;
          console.log('Données reçues du searchedData :', this.searchedData);
          this.sharedDataService.updateCraData(craData);
          this.craComponent.updateCraData(craData);
          // Mettez à jour les données locales dans le composant ProduitComponent
          this.craData = craData;
          console.log('Données mises à jour :', this.craData);
        },
        (error) => {
          console.error('Erreur lors de la récupération des données : ', error);
        }
      );

      this.router.navigate(['/cra'], {
        queryParams: {
          year: this.selectedYear,
          month: this.selectedMonth,
          user: this.selectedUser,
          craData: JSON.stringify(this.craData),
        },
      });
    } else {
      console.log('Veuillez sélectionner une année et/ou un mois et/ou un utilisateur.');
    }
  }
  

  getYearsRange(startYear: number, endYear: number): number[] {
    const years = [];
    for (let i = startYear; i <= endYear; i++) {
      years.push(i);
    }
    return years;
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      console.log('Utilisateurs récupérés : ', this.users);
    });
  }
  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }


  }
  
function moments(): any {
  throw new Error('Function not implemented.');
}

