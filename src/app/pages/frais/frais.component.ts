import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-frais',
  templateUrl: './frais.component.html',
  styleUrls: ['./frais.component.css']
})
export class FraisComponent{

  constructor(private toastrService: ToastrService) {}

  showToast() {
    this.toastrService.success('Bonjour !')
  }

  showError(): void {
    this.toastrService.error('Erreur lors du téléchargement des fichiers', 'Erreur');
  }

}
