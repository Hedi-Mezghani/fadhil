import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListProjectPipePipe } from './searchFilter/list-project.pipe';
import { SidebareComponent } from './sidebare/sidebare.component';
import { LoginuserComponent } from './user/loginuser/loginuser.component';
import { AdduserComponent } from './pages/adduser/adduser.component';
import { ListuserComponent } from './pages/listuser/listuser.component';
import { EdituserComponent } from './pages/edituser/edituser.component';
import { ListprojectComponent } from './pages/project/listproject/listproject.component';
import { EditprojectComponent } from './pages/project/editproject/editproject.component';
import { AddprojectComponent } from './pages/project/addproject/addproject.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DayPilotModule } from 'daypilot-pro-angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddworksComponent } from './pages/works/addworks/addworks.component';
import { EditworksComponent } from './pages/works/editworks/editworks.component';
import { ListworksComponent } from './pages/works/listworks/listworks.component';
import { MY_FORMATS, ProduitComponent } from './pages/produit/produit.component';

import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ListWorksPipePipe } from './searchFilter/list-works-pipe.pipe';
import { BultinDePaie1Component } from './pages/documents/bultin-de-paie1/bultin-de-paie1.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BultinDePaieUploadComponent } from './pages/documents/bultin-de-paie-upload/bultin-de-paie-upload.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { BultinDePaieComponent } from './pages/documents/bultin-de-paie/bultin-de-paie.component';

import { FraisComponent } from './pages/frais/frais.component';
import { AjouterFichesComponent } from './pages/mafiches/ajouter-fiches/ajouter-fiches.component';
import { ListFichesComponent } from './pages/mafiches/list-fiches/list-fiches.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogueCraComponent } from './pages/dialogue-cra/dialogue-cra.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatRippleModule } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MomentDateModule } from '@angular/material-moment-adapter';
import { CraComponent } from './pages/cra/cra.component';
import {MatGridListModule} from '@angular/material/grid-list';

import { TachesComponent } from './pages/taches/taches.component';
import { AddTacheComponent } from './pages/taches/add-tache/add-tache.component';
import { EditTacheComponent } from './pages/taches/edit-tache/edit-tache.component';
import { ListTacheComponent } from './pages/taches/list-tache/list-tache.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { SuccessModalComponent } from './pages/cra/success-modal/success-modal.component';
import { ErrorModalComponent } from './pages/cra/error-modal/error-modal.component';
import { ComptActivite1Component } from './pages/documents/compt-activite1/compt-activite1.component';
import { ComptActivityComponent } from './pages/documents/compt-activity/compt-activity.component';

import { ContratComponent } from './pages/documents/contrat/contrat.component';
import { Contrat1Component } from './pages/documents/contrat1/contrat1.component';
import { ContratUploadComponent } from './pages/documents/contrat-upload/contrat-upload.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    SidebareComponent,
    LoginuserComponent,
    ListProjectPipePipe,
    AdduserComponent,
    ListuserComponent,
    EdituserComponent,
    ListprojectComponent,
    EditprojectComponent,
    AddprojectComponent,
    AddworksComponent,
    EditworksComponent,
    ListworksComponent,
    ProduitComponent,
    DataTableComponent,
    ListWorksPipePipe,
    DocumentsComponent,
    BultinDePaieComponent,
    CraComponent,
    FraisComponent,
    AjouterFichesComponent,
    ListFichesComponent,
    UserDetailsComponent,
    BultinDePaie1Component,
    BultinDePaieUploadComponent,
    DialogueCraComponent,
    DocumentsComponent,
    BultinDePaieComponent,

    CraComponent,
    FraisComponent,
    AjouterFichesComponent,
    ListFichesComponent,
    UserDetailsComponent,
    BultinDePaie1Component,
    BultinDePaieUploadComponent,
    DialogueCraComponent,
    CraComponent,
    TachesComponent,
    AddTacheComponent,
    EditTacheComponent,
    ListTacheComponent,
    SuccessModalComponent,
    ErrorModalComponent,
    ComptActivite1Component,
    ComptActivityComponent,
    ContratComponent,
    Contrat1Component,
    ContratUploadComponent
    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    DayPilotModule,
   
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MomentDateModule,
    MatGridListModule,
    MatIconModule,
    MatSortModule,
    MomentDateModule,
    MatSliderModule,

     // * MATERIAL IMPORTS

     MatMenuModule,
     MatIconModule,
     MatSortModule,
     MatTableModule,
     HttpClientModule,
     MatPaginatorModule,
     ReactiveFormsModule,
     MatDialogModule,
     MatMenuModule,
     MatButtonModule,
     MatRippleModule,
     MatFormFieldModule,
     MatInputModule,
     MatSelectModule,
     FormsModule,
     ToastrModule.forRoot() 
  ],

  providers: [  
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  
  
  bootstrap: [AppComponent],
  schemas:  [NO_ERRORS_SCHEMA],
})
export class AppModule { }
