import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
   listofuser1!:User[];

  dataArray!:User[]
  users!: Observable<Array<User>>;
  dataSource  = new MatTableDataSource<User>();
  constructor(private userservice:UserService, private router:Router ) {}

  ngOnInit(): void {
    this.loadUser()
    this.userservice.getAllUsers().subscribe(data=>{
      this.dataArray=data
      this.dataSource.data = this.dataArray
      console.log(this.dataSource.data);

    })
  }
  afficherDetailsUtilisateur(user: User) {
    // Naviguez vers le composant des détails de l'utilisateur en passant l'ID de l'utilisateur dans les paramètres d'URL
    this.router.navigate(['/user-details', user.id]);
    console.log(user.id)
  }

  showUserDetails(user: User) {
    this.router.navigate(['/user-details', user.id]);
  }

  handleDeleteUser(c: User) {
    let conf = confirm('Are you sure?');
    if (!conf) return;
    this.userservice.deleteUser(c.id).subscribe({
      next: (resp) => {
        this.users = this.users.pipe(
          map((data) => {
            let index = data.indexOf(c);
            data.slice(index, 1);
            return data;
          })
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.userservice.refresh()
  }
  loadUser() {
    return (
      this.userservice.getAllUsers().subscribe((data) => {
        this.listofuser1 = data;
      }),
      (err: any) => console.log(err)
    );

  }

}
