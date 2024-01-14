import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';



@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId!: number;
  user!: User;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    // Récupérez l'ID de l'utilisateur à partir des paramètres d'URL
    this.route.params.subscribe(params => {
      this.userId = +params['id']; // Le '+' convertit la chaîne en nombre
      // Utilisez l'ID pour récupérer les détails de l'utilisateur à partir du service
      this.userService.getUserById(this.userId).subscribe(data => {
        this.user = data;
      });
    });
  }
}
