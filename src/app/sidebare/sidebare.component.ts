import { Role } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-sidebare',
  templateUrl: './sidebare.component.html',
  styleUrls: ['./sidebare.component.css']
})
export class SidebareComponent implements OnInit {
  isSubMenuVisible = false;
  isAdmin: boolean = false;
  constructor(
    public authService: AuthService,
    private router: Router,
    public storage: StorageService
  ) { }

  ngOnInit(): void {
    const userRole = this.storage.getUser().Role;

    // Mettez à jour la variable isAdmin en fonction du rôle de l'utilisateur.
    this.isAdmin = userRole === 'admin';

  }
  toggleSubMenu() {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  }
  handleLogout() {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Déconnexion !',
    }).then((result) => {
      if (result.isConfirmed) {
        this.storage.clean();
        this.router.navigateByUrl('/login');
        Swal.fire(
          'Déconnecté!',
          'La Déconnexion a été effectuée avec succées.',
          'success'
        );
      }
    });
  }



}
