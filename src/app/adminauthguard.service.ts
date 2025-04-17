import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AdminauthService } from './adminauth.service';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminauthguardService implements CanActivate
{

  constructor(private adminauthService:AdminauthService,private router:Router) 
  { 

  }

  canActivate() {
      
    if(this.adminauthService.isUserLoggedIn()){
      
      return true;
    }
    else {
      this.router.navigate(['adlogin'])
      return false;
    }
  }
}
