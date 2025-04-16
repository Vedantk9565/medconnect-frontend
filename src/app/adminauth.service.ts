import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminauthService {

  constructor() { }

  authenticate(username2:string,password2:string){

    if(username2=='ayush'&&password2=='ayush@9565')
    {
      sessionStorage.setItem('username2',username2);
      return true
    }
    else {
      return false
    }
  }
  isUserLoggedIn(){
    console.log("Login ")
    let user= sessionStorage.getItem('username2');

    return !(user==null)
  }
  logout(){
    console.log("Logout")
    sessionStorage.removeItem('username2');
  }
}
