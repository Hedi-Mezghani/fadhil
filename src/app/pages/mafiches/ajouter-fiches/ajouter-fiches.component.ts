import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-ajouter-fiches',
  templateUrl: './ajouter-fiches.component.html',
  styleUrls: ['./ajouter-fiches.component.css']
})
export class AjouterFichesComponent implements OnInit {

  formulaire!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private fileserv: FileService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formulaire = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      anciennete: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required]],
      rib: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formulaire.valid) {
      // Obtenez les données du formulaire
      const formData = this.formulaire.value;

      // Appelez la méthode createFile du service pour créer le fichier
      this.fileserv.createFile(formData).subscribe(
        (response) => {
          console.log('Fichier créé avec succès!', response);
          // Réinitialisez le formulaire après la création réussie
          this.formulaire.reset();
        },
        (error) => {
          console.error('Erreur lors de la création du fichier', error);
        }
      );
    }
  }
}
