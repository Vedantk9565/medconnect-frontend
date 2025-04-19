import { Component } from '@angular/core';
import { PatientService } from '../patient.service';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../patient';
import { PrescriptionService } from '../prescription.service'; // Import PrescriptionService
import { BASE_URL } from '../constants';  // adjust path as needed

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent {

  id: number = 0;
  patient: Patient = new Patient();
  currentDateTime: string = ''; // Declare this property to store the current date and time

  constructor(
    private patientService: PatientService,
    private prescriptionService: PrescriptionService, // Use PrescriptionService here
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.patientService.getPatientById(this.id).subscribe(data => {
      this.patient = data;
  
      // Check if prescription is a string (for example, 'Amoxicillin, Crosin')
      if (typeof this.patient.prescription === 'string') {
        // If it's a string, split it into an array of objects
        this.patient.prescription = (this.patient.prescription as string).split(',').map((medicine: string) => ({
          medicineName: medicine.trim(),  // Remove extra spaces
          timeToTake: 'Morning'  // Default time, or handle accordingly
        }));
      }
  
      console.log(this.patient.prescription); // Log the transformed structure
  
      const now = new Date();
      this.currentDateTime = now.toLocaleString();
    });

  }
  
  
  
  

  printPage(): void {
    const printContents = document.getElementById('print-section')?.innerHTML;
    const popupWin = window.open('', '_blank', 'width=800,height=600');
    popupWin?.document.open();
    popupWin?.document.write(`
      <html>
        <head>
          <title>Print Prescription</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; }
            h3, h4 { margin-top: 10px; }
          </style>
        </head>
        <body onload="window.print();window.close()">
          ${printContents}
        </body>
      </html>
    `);
    popupWin?.document.close();
  }

  sendPrescription(): void {
    this.prescriptionService.sendPrescription(this.patient.id).subscribe({
      next: () => {
        alert('Prescription PDF sent successfully via WhatsApp!');
      },
      error: (error) => {
        console.error('Error sending prescription PDF:', error);
        alert('Error sending prescription PDF: ' + (error.error || error.message || 'Unknown error'));
      }
    });
  }
  
  assignSelectedMedicines() {
    const patientId = this.route.snapshot.queryParams['patientId'];
  
    const data = this.selectedMedicines.map(med => ({
      medicineName: med.medicineName,
      timeToTake: med.timeToTake
    }));
  
    this.prescriptionService.assignMedicines(patientId, data).subscribe({
      next: () => {
        alert('Medicines assigned successfully!');
      },
      error: (err) => {
        console.error('Error assigning medicines:', err);
        alert('Failed to assign medicines.');
      }
    });
  }
  
  selectedMedicines: { medicineName: string; timeToTake: string[] }[] = [];

}
