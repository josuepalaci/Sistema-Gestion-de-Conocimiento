import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

    constructor(
      private router: Router,
      private afAuth: AngularFireAuth
    ){    }

    canActivate(): Observable<boolean>{
      return this.afAuth.authState.pipe(
          map( auth=>{
                  if(!auth){
                      this.router.navigate(['/login']);
                      return false;
                  } else {
                      return true;
                  }
              }
          )
      );
  }


}
