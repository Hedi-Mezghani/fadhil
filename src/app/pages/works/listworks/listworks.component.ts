import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { Works } from 'src/app/models/works';

import { StorageService } from 'src/app/service/storage.service';
import { WorksService } from 'src/app/service/works.service';
import Swal from 'sweetalert2';
import { EditworksComponent } from '../editworks/editworks.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { getPackedSettings } from 'http2';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import * as XLSX from 'xlsx'
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

@Component({
  selector: 'app-listworks',
  templateUrl: './listworks.component.html',
  styleUrls: ['./listworks.component.css']
})
export class ListworksComponent implements OnInit {
  private page:number=0;
  private size:number=20;

  private pages!:Array<number> ;
  fileName = "samplesheet.xlsx"

  works: Works[] = [];
	totalElements: number = 0;

  // usersState$: Observable<{ appState: string, appData?: ApiResponse<Works>, error?: HttpErrorResponse }>;
  // responseSubject = new BehaviorSubject<ApiResponse<Works>>(null);
  // private currentPageSubject = new BehaviorSubject<number>(0);
  // currentPage$ = this.currentPageSubject.asObservable();
  // loadingService: any;


  searchCat!: string;
  router: any;
  pageIndex!: number;
  pageSize!: number;
  constructor(
    public CatService: WorksService,
    public storage: StorageService,
    private dialog: MatDialog
  ) {}

  listworks!: Works[];


  ngOnInit() {
    this.loadWorks();
    // this.getpage();

  }
  loadWorks = () => {
    if (this.storage.getUser().roles == 'ROLE_ADMIN')
    {return this.CatService.getWorks().subscribe((data) => {
      console.log(data)
      this.listworks = data;
    });}
    else
    {
      return this.CatService.getworksbyuser(this.storage.getUser().id).subscribe((data)=>{
       console.log(data)
        this.listworks=data;})
    }
  };

  onDetail(obj: Works) {
    const dialogRef = this.dialog.open(EditworksComponent, {
      width: '40%',
      data: obj,
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.loadWorks();
    });
  }
  Deleteworks = (id: Object) => {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le !',
    }).then((result) => {
      if (result.isConfirmed) {
        this.CatService.DeleteWorks(id).subscribe((res) => {
          this.loadWorks();
        });
        Swal.fire(
          'Supprimé!',
          'La suppression a été effectuée avec succées.',
          'success'
        );

      }
    });
  };
  // gotToPage(name?: string, pageNumber: number = 0): void {
  //   this.loadingService.loadingOn();
  //   this.usersState$ = this.userSevice.users$(name, pageNumber).pipe(
  //     map((response: ApiResponse<Works>) => {
  //       this.loadingService.loadingOff();
  //       this.responseSubject.next(response);
  //       this.currentPageSubject.next(pageNumber);
  //       console.log(response);
  //       return ({ appState: 'APP_LOADED', appData: response });
  //     }),
  //     startWith({ appState: 'APP_LOADED', appData: this.responseSubject.value }),
  //     catchError((error: HttpErrorResponse) =>{
  //       this.loadingService.loadingOff();
  //       return of({ appState: 'APP_ERROR', error })}
  //       )
  //   )
  // }

  // goToNextOrPreviousPage(direction?: string, name?: string): void {
  //   this.gotToPage(name, direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  // }


//   getpage(){

//     this.CatService.getWorks().subscribe(
//       data=>{
//       console.log(data)


//       },
//       (error)=>{
//         console.log(error.error.message)

//       }
//     )
//   }
//   onPageChange(event: PageEvent) {
//     this.pageIndex = event.pageIndex;
//     this.pageSize = event.pageSize;
//     this.loadEmployees();
// }

loadEmployees() {
    this.CatService.getpage(this.pageIndex, this.pageSize).subscribe(response => {
        //  this.listworks = response.content;
        //  this.totalItems = response.totalElements;
    });
}



  exportexel():void{
    let element =document.getElementById('excel-table')
    const ws:XLSX.WorkSheet=XLSX.utils.table_to_sheet(element)

    const wb:XLSX.WorkBook=XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb,ws,'sheet1')
    XLSX.writeFile(wb,this.fileName)
  }
}
