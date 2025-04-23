import { Component } from '@angular/core';
import { Medicine } from '../medicine';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-medicinelist',
  templateUrl: './medicinelist.component.html',
  styleUrls: ['./medicinelist.component.css']
})
export class MedicinelistComponent {
  medicines: Medicine[] = [];
  selectedMedicines: { id: number, name: string, timeToTake: string[] } []=[];  // Added id to the type
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
  
    const existingIndex = this.selectedMedicines.findIndex(m => m.id === medicine.id);
  
    if (isChecked) {
      // If not already added, add it
      if (existingIndex === -1) {
        this.selectedMedicines.push({
          id: medicine.id,
          name: medicine.drugName,
          timeToTake: []
        });
      }
    } else {
      // If unchecked, remove it
      if (existingIndex !== -1) {
        this.selectedMedicines.splice(existingIndex, 1);
      }
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
      if (!medicine.timeToTake || medicine.timeToTake.length === 0) {
        alert(`Please select at least one time for medicine: ${medicine.name}`);
        return;
      }
    }
  
    // Send selected medicines and their times to the backend
    const medicinesWithTime = this.selectedMedicines.map(medicine => ({
      medicineName: medicine.name,
      timeToTake: medicine.timeToTake
    }));
  
    console.log('Request Payload:', medicinesWithTime);  // Log the payload
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

    const uniqueMedicines = Array.from(
      new Map(this.selectedMedicines.map(m => [m.id, m])).values()
    );
    
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
    return this.selectedMedicines.find(m => m.id === medicine.id);
  }
  

  
  updateMultipleTimesToTake(medicine: Medicine, selectedTimes: string[]) {
    const selected = this.selectedMedicines.find(m => m.id === medicine.id);
    if (selected) {
      // Update the selected medicine's timeToTake with the array of selected times
      selected.timeToTake = selectedTimes;
    }
  }
  
  
  
  

}
