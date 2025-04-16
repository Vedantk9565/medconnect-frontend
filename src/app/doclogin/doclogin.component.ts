import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DocauthService } from '../docauth.service';
import { BASE_URL } from '../constants';  // adjust path as needed

@Component({
  selector: 'app-doclogin',
  templateUrl: './doclogin.component.html',
  styleUrl: './doclogin.component.css'
})
export class DocloginComponent {

  username:string="";
  password:string="";

  invalidLogin=false;
  constructor(private router:Router,private docauth:DocauthService){}
  checkLogin()
  {
    if(this.docauth.authenticate(this.username,this.password)){
     
    this.router.navigate(['docdash'])
      this.invalidLogin=false
    }


    else {
      this.invalidLogin=true
      alert("Wrong Credentials")
      this.router.navigate(['home'])
      
    }
  }
}
