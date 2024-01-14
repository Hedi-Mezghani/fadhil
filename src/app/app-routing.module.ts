import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuarduserGuard } from './guard/guarduser.guard';
import { AdduserComponent } from './pages/adduser/adduser.component';
import { EdituserComponent } from './pages/edituser/edituser.component';
import { ListuserComponent } from './pages/listuser/listuser.component';
import { ProduitComponent } from './pages/produit/produit.component';
import { AddprojectComponent } from './pages/project/addproject/addproject.component';

import { EditprojectComponent } from './pages/project/editproject/editproject.component';
import { ListprojectComponent } from './pages/project/listproject/listproject.component';
import { AddworksComponent } from './pages/works/addworks/addworks.component';
import { EditworksComponent } from './pages/works/editworks/editworks.component';
import { ListworksComponent } from './pages/works/listworks/listworks.component';
import { SidebareComponent } from './sidebare/sidebare.component';
import { LoginuserComponent } from './user/loginuser/loginuser.component';
import { BultinDePaieComponent } from './pages/documents/bultin-de-paie/bultin-de-paie.component';

import { CraComponent } from './pages/cra/cra.component';
import { FraisComponent } from './pages/frais/frais.component';
import { AjouterFichesComponent } from './pages/mafiches/ajouter-fiches/ajouter-fiches.component';
import { ListFichesComponent } from './pages/mafiches/list-fiches/list-fiches.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { TachesComponent } from './pages/taches/taches.component';
import { ListTacheComponent } from './pages/taches/list-tache/list-tache.component';
import { BultinDePaie1Component } from './pages/documents/bultin-de-paie1/bultin-de-paie1.component';
import { ComptActivityComponent } from './pages/documents/compt-activity/compt-activity.component';
import { ComptActivite1Component } from './pages/documents/compt-activite1/compt-activite1.component';
import { ContratComponent } from './pages/documents/contrat/contrat.component';


const routes: Routes = [
  {path:'login',component:LoginuserComponent},
  {path:'',component:SidebareComponent,canActivate:[GuarduserGuard],children :[
    {path:'',component:AddworksComponent},
    {path:'adduser',component:AdduserComponent},
    {path:'listuser',component:ListuserComponent},
    {path:'edituser/:_id',component:EdituserComponent},
    {path:'addproject',component:AddprojectComponent},
    {path:'listproject',component:ListprojectComponent},
    {path:'editproject/:_id',component:EditprojectComponent},
    {path:'addworks',component:AddworksComponent},
    {path:'editworks/:id',component:EditworksComponent},
    {path:'listworks',component:ListworksComponent},
    {path:'produit',component:ProduitComponent},
    {path:'bultin-de-paie',component:BultinDePaieComponent},
    {path:'cra',component:CraComponent},
  
    {path:'frais',component:FraisComponent},
    {path:'ajouterfiches',component:AjouterFichesComponent},
    {path:'listfiches',component:ListFichesComponent},
    {path:'user-details/:id',component:UserDetailsComponent},
    {path:'listTache',component:ListTacheComponent},
    {path:'bultin1',component:BultinDePaie1Component},
    {path:'compt-activite',component:ComptActivityComponent},
    {path:'contrat',component:ContratComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
