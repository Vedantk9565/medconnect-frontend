import { Component } from '@angular/core';
import { Medicine } from '../medicine';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-medicinelist',
  templateUrl: './medicinelist.component.html',
  styleUrls: ['./medicinelist.component.css']
})
export class MedicinelistComponent {
  medicines: Medicine[] = [];
  selectedMedicines: string[] = [];
  patientId!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.queryParamMap.get('patientId'));
    if (!this.patientId) {
      alert("Patient ID is missing.");
    }
    this.getMedicine();
  }

  getMedicine() {
    this.http.get<Medicine[]>("https://medconnect-backend-283p.onrender.com/api/v3/medicines")
    .subscribe(data => {
      this.medicines = data;
    });
  }

  toggleMedicineSelection(medicineName: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedMedicines.push(medicineName);
    } else {
      this.selectedMedicines = this.selectedMedicines.filter(name => name !== medicineName);
    }
  }

  assignSelectedMedicines() {
    if (this.selectedMedicines.length === 0) {
      alert("Please select at least one medicine.");
      return;
    }

    this.http.put(
     `https://medconnect-backend-283p.onrender.com/api/v1/patients/${this.patientId}/add-medicine`,
      this.selectedMedicines,
      { responseType: 'text' } // 👈 this fixes it
    ).subscribe({
      next: (response) => {
        alert(response); // You’ll now get the string: "Medicines assigned successfully"
        this.selectedMedicines = [];
      },
      error: (err) => {
        console.error('Error adding medicine:', err);
        alert('Failed to assign medicines.');
      }
    });
    
  }

  update(id: number) {
    this.router.navigate(['update-medicine', id]);
  }

  delete(id: number) {
    this.http.delete(`https://medconnect-backend-283p.onrender.com/api/v3/medicines/${id}`
).subscribe(() =>
   {
      this.getMedicine();
    });
  }
}
