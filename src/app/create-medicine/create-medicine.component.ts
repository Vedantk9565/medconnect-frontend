import { Component } from '@angular/core';
import { Medicine } from '../medicine';
import { MedicineService } from '../medicine.service';
import { Router } from '@angular/router';
import { BASE_URL } from '../constants';  // adjust path as needed

@Component({
  selector: 'app-create-medicine',
  templateUrl: './create-medicine.component.html',
  styleUrl: './create-medicine.component.css'
})
export class CreateMedicineComponent {

  medicine:Medicine=new Medicine();
  constructor(private medicineService:MedicineService,private router:Router){}
  
  saveMedicine(){
      this.medicineService.createMedicine(this.medicine).subscribe(data=>{
        
        console.log(this.medicine);
        this.goToViewMedicine();
      })
  }

  onSubmit(){
    this.saveMedicine();

    
  }

  goToViewMedicine(){

    this.router.navigate(['/view-medicine'])
  }
}
