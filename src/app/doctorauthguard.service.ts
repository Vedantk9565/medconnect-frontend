import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { DocauthService } from './docauth.service';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DoctorauthguardService implements CanActivate
 {

  constructor(private docauthService:DocauthService,private router:Router) { }
  
  canActivate() 
  {
    if(this.docauthService.isUserLoggedIn()){
      return true;
    }
    else
    {
      this.router.navigate(['doclogin'])
      return false;
    }
      
  }
}
