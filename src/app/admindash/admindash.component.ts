import { Component } from '@angular/core';
import { PatientService } from '../patient.service';
import { Patient } from '../patient';
import { AdminauthService } from '../adminauth.service';
import { Router } from '@angular/router';
import { BASE_URL } from '../constants';  // adjust path as needed

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrl: './admindash.component.css'
})
export class AdmindashComponent {
searchPatients() {
throw new Error('Method not implemented.');
}
searchText: any;
deletePatient(arg0: number) {
throw new Error('Method not implemented.');
}
  patients:Patient[]=[];
constructor(private patientService:PatientService,private adminauthService:AdminauthService,private router:Router){}
ngOnInit():void{
  this.getPatients();
}
getPatients(){
  this.patientService.getPatientList().subscribe(data=>{
this.patients=data;
  })
}
delete(id:number)
{
  this.patientService.delete(id).subscribe(data=>{console.log(data);
    this.getPatients();
  })
}

logout(){
  this.adminauthService.logout();
  this.router.navigate(['home'])
}
}
