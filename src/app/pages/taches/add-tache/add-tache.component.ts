import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/models/tache';
import { TacheService } from 'src/app/service/tache.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-tache',
  templateUrl: './add-tache.component.html',
  styleUrls: ['./add-tache.component.css']
})
export class AddTacheComponent implements OnInit {

  cat: Client = new Client();
  clientForm!: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private tacheService: TacheService,
    public dialogref: MatDialogRef<AddTacheComponent>
  ) {}

  ngOnInit() {
    this.initForms();
  }
  initForms() {
    this.clientForm = this.formbuilder.group({
      nom: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      code_client: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      code_postal: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      pays: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      department: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      web: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      telephone: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }  
  get nom() {
    return this.clientForm.get('nom');
  }

  get address(){
    return this.clientForm.get('address')
  }
  get code_client() {
    return this.clientForm.get('code_client');
  }

  get code_postal(){
    return this.clientForm.get('code_postal')
  }

  get pays() {
    return this.clientForm.get('pays');
  }

  get department(){
    return this.clientForm.get('department')
  }
  get email() {
    return this.clientForm.get('email');
  }

  get web(){
    return this.clientForm.get('web')
  }
  get wetelephoneb(){
    return this.clientForm.get('telephone')
  }
 


  onSubmitForm() {
    let client: Client = this.clientForm?.value;
    console.log(client)
    this.tacheService.AddTache(client).subscribe({
      next: (data) => {
        this.dialogref.close();
        Swal.fire(
          "L'insertion a été effectuée avec succès!",
          'Cliquer içi!',
          'success'
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onFileChanged(event: any) {
    console.log(event.target.files[0].name);
    this.cat.nom = 'client/' + event.target.files[0].name;
  }
}
