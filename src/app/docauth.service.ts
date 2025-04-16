import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocauthService {

  constructor() { }

  authenticate(username:string,password:string){

    if(username=="vedant"&&password=="vedant@9565"){

      sessionStorage.setItem('username',username);
      return true;

    }
    else {
      return false;
    }
  }
  isUserLoggedIn()
  {
    console.log("Doctor Logged in")
    let user=sessionStorage.getItem('username');
    return!(user==null)
  }
  
  logout()
  {
    console.log("Doctor Logout")

    sessionStorage.removeItem('username');
  }
}
