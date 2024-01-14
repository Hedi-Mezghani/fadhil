import { HttpClient, HttpEvent, HttpEventType, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/service/file-upload.service';
import * as saveAs from 'file-saver';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/service/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BultinDePaie1Component } from '../bultin-de-paie1/bultin-de-paie1.component';
import { Cloudinary } from 'cloudinary-core';
import { StorageService } from 'src/app/service/storage.service';


@Component({
  selector: 'app-bultin-de-paie',
  templateUrl: './bultin-de-paie.component.html',
  styleUrls: ['./bultin-de-paie.component.css']
})
export class BultinDePaieComponent implements OnInit {

  utilisateurSelectionneId!: number | null;
  utilisateurSelectionne!: User[];
  selectedUserId:any;
  selectedFiles: File[] = [];
  filenames: string[] = [];
  downloadableFiles: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  //list user
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
   listofuser1!:User[];

  dataArray!:User[]
  users!: Observable<Array<User>>;
  dataSource  = new MatTableDataSource<User>();
  user!:User
  selectedFile:any

  utilisateur!:User;
  publicId:string[]=[]
  cloudinary: Cloudinary;
  pdfUrl: string;
  constructor(
    private http: HttpClient,
    private fileService: FileUploadService,
     private router:Router,private userservice:UserService,
     private storageService:StorageService,
     private dialog: MatDialog) {
    this.user=new User()
    this.cloudinary = new Cloudinary({
      cloud_name: 'syfax',
      api_key: '836798284526591',
      api_secret: 'TfEOEiQuibpTmKfFST_bF-AOJgw'
    });
    this.pdfUrl='https://res.cloudinary.com/syfax/image/upload/v1697214393/ufpo9ygwmimxltl9vkxy.pdf'
  }

  ngOnInit(): void {
    const userRoles = this.storageService.getUser().roles; // Assurez-vous que votre modèle User a une propriété 'roles'
    console.log('User Roles:', userRoles);

    if (userRoles.includes('ROLE_ADMIN')) {
      this.userservice.getAllUsers().subscribe(data => {
        this.dataArray = data;
        this.dataSource.data = this.dataArray;
      });
    } else {
      const userId = this.storageService.getUser().id; // Récupérez l'ID de l'utilisateur connecté
      this.userservice.getUserById(userId).subscribe(user => {
        this.dataArray = [user]; // Mettez l'utilisateur unique dans le tableau
        this.dataSource.data = this.dataArray;
      });
    }

    
    if (userRoles.includes('ROLE_ADMIN')) {
      this.userservice.getAllUsers().subscribe(data => {
        this.dataArray = data;
        this.dataSource.data = this.dataArray;
      });
    } else {
      const userId = this.storageService.getUser().id; // Récupérez l'ID de l'utilisateur connecté
      console.log('User ID:', userId); // Affichez l'ID de l'utilisateur dans la console
      this.userservice.getUserById(userId).subscribe(user => {
        this.dataArray = [user]; // Mettez l'utilisateur unique dans le tableau
        this.dataSource.data = this.dataArray;
      });
    }
  }

  isUserAdmin(): boolean {
    const user = this.storageService.getUser();
    return user && user.roles && user.roles.includes('ROLE_ADMIN');
  }




  onFileSelected(event: any): void {
    this.selectedFile = event.target.files;

}



  onDownload(filename: string): void {

    this.fileService.downloadFile(filename).subscribe(
      (response: HttpResponse<Blob>) => {
        if (response.body) {
          const blob = new Blob([response.body], { type: 'application/octet-stream' });

          const url = window.URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.style.display = 'none';

          document.body.appendChild(link);

          link.click();

          document.body.removeChild(link);

          window.URL.revokeObjectURL(url);
        } else {
          console.error('Empty response body');
        }
      },
      error => {
        console.error('Error downloading file:', error);
      }
    );
  }

//listUser
afficherDetailsUtilisateur(user: User) {
  this.router.navigate(['/user-details', user.id]);
}
afficherDetailsUtilisateur1(userId: number) {
  this.selectedUserId = userId;
  this.userservice.getUserDetails(userId).subscribe(
    userDetails => {
      console.log('Détails de l\'utilisateur:', userDetails);
    },
    error => {
      console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
    }
  );
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
onCreate(item:User) {
  const dialogconfig = new MatDialogConfig();
  dialogconfig.autoFocus = true;
  dialogconfig.disableClose = true;
  dialogconfig.width = '65%';
  dialogconfig.height = '65%';
    dialogconfig.data = {
      utilisateurId: item.id
    };

  this.dialog
    .open(BultinDePaie1Component, dialogconfig)
    .afterClosed()
    .subscribe((res) => {
     // this.loadProject();
    });

}

}