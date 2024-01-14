
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  listUser!:User[];
  newuserFormGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newuserFormGroup = this.fb.group({
      username: this.fb.control(null, [ Validators.required, Validators.minLength(3),   ]),


      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [Validators.required]),
      scendname:this.fb.control(null, [Validators.required]),
      tel: this.fb.control(null, [Validators.required]),
      experience:this.fb.control(null, [Validators.required]),
      birthday:this.fb.control(null, [Validators.required]),
      rib:this.fb.control(null, [Validators.required]),
      post:this.fb.control(null, [Validators.required]),
      equipe:this.fb.control(null, [Validators.required]),
      manager:this.fb.control(null, [Validators.required]),
      statut:this.fb.control(null, [Validators.required]),
      datedebut:this.fb.control(null, [Validators.required])

    });



  }
  loadUser() {
    return (
      this.userservice.getAllUsers().subscribe((data) => {
        this.listUser = data;
      }),
      (err: any) => console.log(err)
    );

  }
  handleSaveuser() {
    let user: User = this.newuserFormGroup?.value;
    this.userservice.saveUser(user).subscribe(
      (data) => {
        Swal.fire(
          'Good job!',
          'user has been successfully saved !',
          'success'
        );
        this.router.navigateByUrl('/listuser');
      },
      this.loadUser()



    );
  }

}
