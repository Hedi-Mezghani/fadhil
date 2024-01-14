import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CraData } from '../models/craData';

@Injectable({
  providedIn: 'root'
})
export class SharedDataServiceService {
  private craDataSubject = new BehaviorSubject<CraData[]>([]);
  craData$: Observable<CraData[]> = this.craDataSubject.asObservable();

  updateCraData(craData: CraData[]): void {
    this.craDataSubject.next(craData);
  }
}
