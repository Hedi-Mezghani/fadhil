import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TotalService {
  private productionSubject = new Subject<number>();
  private absenceSubject = new Subject<number>();

  production$ = this.productionSubject.asObservable();
  absence$ = this.absenceSubject.asObservable();

  updateProduction(total: number): void {
    this.productionSubject.next(total);
  }

  updateAbsence(total: number): void {
    this.absenceSubject.next(total);
  }
}
