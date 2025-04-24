import { Component } from '@angular/core';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';
import { DocauthService } from '../docauth.service';
import { Patient } from '../patient';

@Component({
  selector: 'app-docdash',
  templateUrl: './docdash.component.html',
  styleUrls: ['./docdash.component.css']
})
export class DocdashComponent {

  searchQuery: string = ''; // Model for search input
  patients: Patient[] = [];  // Original list of patients
  filteredPatients: Patient[] = [];  // Patients filtered by search

  constructor(
    private patientService: PatientService,
    private router: Router,
    private docauth: DocauthService
  ) {}

  ngOnInit(): void {
    this.getPatients();
  }

  // Fetching the patient list from the backend
  getPatients(): void {
    this.patientService.getPatientList().subscribe(data => {
      this.patients = data;
      this.filteredPatients = data; // Initially, show all patients
    });
  }

  // Search function to filter patients based on name or ID
  searchPatient(): void {
    if (this.searchQuery) {
      this.filteredPatients = this.patients.filter(patient =>
        patient.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        patient.id.toString().includes(this.searchQuery)
      );
    } else {
      this.filteredPatients = this.patients; // Show all patients if search is cleared
    }
  }

  // Update a patient's details
  update(id: number): void {
    this.router.navigate(['update-patient', id]);
  }

  // Delete a patient
  delete(id: number): void {
    this.patientService.delete(id).subscribe(data => {
      console.log(data);
      this.getPatients(); // Refresh the patient list after deletion
    });
  }

  // View a patient's details
  view(id: number): void {
    this.router.navigate(['view-patient', id]);
  }

  // Logout the doctor
  logout(): void {
    this.docauth.logout();
    this.router.navigate(['home']);
  }

  // Assign medicine to a patient
  assignMedicine(patientId: number): void {
    this.router.navigate(['/view-medicine'], { queryParams: { patientId } });
  }
  searchPatients() {
    const query = this.searchQuery.toLowerCase().trim();
  
    this.filteredPatients = this.patients.filter(patient => {
      const nameMatch = patient.name.toLowerCase().includes(query);
      const idMatch = patient.id.toString().includes(query);
      return nameMatch || idMatch;
    });
  }
  
}
