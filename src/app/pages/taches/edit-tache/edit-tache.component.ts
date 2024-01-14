import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/models/tache';
import { TacheService } from 'src/app/service/tache.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-tache',
  templateUrl: './edit-tache.component.html',
  styleUrls: ['./edit-tache.component.css']
})
export class EditTacheComponent implements OnInit {

  id: object;
  clientForm!: FormGroup;
  nom!: string;
  code_client!: string;
  address!: string;
  code_postal!:number;
  pays!:string;
  department!:string;
  email!:string;
  web!:string;
  telephone!:number;

  constructor(
    private formbuilder: FormBuilder,
    private techeService: TacheService,
    public dialogref: MatDialogRef<EditTacheComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.id = data.id;
    this.nom= data.nom;
    this.code_client = data.code_client;
    this.address = data.address;
    this.code_postal= data.code_postal;
    this.pays = data.pays;
    this.department = data.department;
    this.email = data.email;
    this.web= data.web;
    this.telephone = data.telephone;
  }
  cat: Client = new Client();
   listtache!:Client[]
  ngOnInit() {
    this.initForms();
  }
  loadProject = () => {
    return this.techeService.getTaches().subscribe((data) => {
      this.listtache = data;
      console.log(data)
    });}

  initForms() {
    this.clientForm = this.formbuilder.group({
      id: this.id,
      nom:this.nom,
      code_client: this.code_client,
      address: this.address,
      code_postal: this.code_postal,
      pays: this.pays,
      department:this.department,
      email: this.email,
      web:  this.web,
      telephone: this.telephone,
    });
  }

  onSubmitForm() {
    const formValue = this.clientForm.value;
    const newTache = new Client();
    newTache.id = formValue['id'];
    newTache.nom=formValue['nom']
    newTache.code_client = formValue['code_client'];
    newTache.address = formValue['address'];
    newTache.code_postal = formValue['code_postal'];
    newTache.code_client = formValue['code_client'];
    newTache.pays = formValue['pays'];
    newTache.department = formValue['department'];
    newTache.email = formValue['email'];
    newTache.web = formValue['web'];
    newTache.telephone = formValue['telephone'];

    this.techeService.UpdateTache(newTache.id, newTache).subscribe((data) => {
      this.cat = data;
      this.loadProject()
    });
    this.dialogref.close();
    Swal.fire(
      'La modification a été effectuée avec succès!',
      'Cliquer içi!',
      'success'
    );
  }
  onFileChanged(event: any) {
    console.log(event.target.files[0].name);
    this.cat.nom = 'clients/' + event.target.files[0].name;
  }

}
