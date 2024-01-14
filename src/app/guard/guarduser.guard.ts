import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class GuarduserGuard implements CanActivate {
  constructor(private authService: StorageService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let isLoggedIn = this.authService.isLoggedIn();
      if (isLoggedIn == false) {
        this.router.navigateByUrl('/login');
        return false;
      } else {
        return true;
      }
    }

}
