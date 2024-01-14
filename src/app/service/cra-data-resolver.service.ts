
// cra-data.resolver.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CraService } from './cra.service';
import { CraData } from '../models/craData';

@Injectable({
  providedIn: 'root'
})
export class CraDataResolverService implements Resolve<CraData[]> {
  constructor(private craService: CraService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CraData[]> {
    // Extraire les paramètres de la route (année et mois)
    const yearParam = route.paramMap.get('year');
    const monthParam = route.paramMap.get('month');

    // Vérifier si les paramètres sont présents et ne sont pas nuls
    if (yearParam === null || monthParam === null) {
      // Gérer le cas où l'une des valeurs est absente
      // Vous pouvez lancer une exception, rediriger, ou prendre d'autres mesures appropriées.
      // Par exemple, renvoyer un Observable vide ou un tableau vide.
      return of([]);
    }

    // Convertir les valeurs en nombre
    const year = +yearParam;
    const month = +monthParam;

    // Récupérer les données nécessaires du service en utilisant les paramètres extraits
    return this.craService.getCraDataByYearAndMonth(year, month);
  }
}
