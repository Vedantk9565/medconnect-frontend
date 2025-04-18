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
  selectedMedicines: { name: string, timeToTake: string }[] = [];  // Store name and time for selected medicines
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

  toggleMedicineSelection(medicine: Medicine, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    medicine.isSelected = isChecked;
  
    if (isChecked) {
      this.selectedMedicines.push({
        name: medicine.drugName,
        timeToTake: '' // Empty until selected
      });
    } else {
      this.selectedMedicines = this.selectedMedicines.filter(m => m.name !== medicine.drugName);
    }
  }
  
  
  isSelected(medicine: Medicine): boolean {
    return !!medicine.isSelected;
  }
  

  assignSelectedMedicines() {
    if (this.selectedMedicines.length === 0) {
      alert("Please select at least one medicine.");
      return;
    }

    // Make sure each selected medicine has a time assigned
    for (const medicine of this.selectedMedicines) {
      if (!medicine.timeToTake) {
        alert(`Please select a time for medicine: ${medicine.name}`);
        return;
      }
    }

    // Send selected medicines and their times to backend
    const medicinesWithTime = this.selectedMedicines.map(medicine => ({
      medicineId: medicine.name,  // Adjust based on how the backend expects this
      timeToTake: medicine.timeToTake
    }));

    this.http.put(
      `https://medconnect-backend-283p.onrender.com/api/v1/patients/${this.patientId}/add-medicine`,
      medicinesWithTime,
      { responseType: 'text' }
    ).subscribe({
      next: (response) => {
        alert(response);
        this.selectedMedicines = [];
      },
      error: (err) => {
        console.error('Error assigning medicines:', err);
        alert('Failed to assign medicines.');
      }
    });
  }

  update(id: number) {
    this.router.navigate(['update-medicine', id]);
  }

  delete(id: number) {
    this.http.delete(`https://medconnect-backend-283p.onrender.com/api/v3/medicines/${id}`)
      .subscribe(() => {
        this.getMedicine();
      });
  }
  getSelectedMedicine(medicine: Medicine) {
    return this.selectedMedicines.find(m => m.name === medicine.drugName);
  }
  
  updateTimeToTake(medicine: Medicine, time: string) {
    const selected = this.selectedMedicines.find(m => m.name === medicine.drugName);
    if (selected) {
      selected.timeToTake = time;
    }
  }
  
}
