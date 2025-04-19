import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from './constants'; // Optional centralized base URL
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PrescriptionService
 {

  
  private baseUrl = `${environment.apiUrl}/api/v1/prescriptions`;
  constructor(private httpClient: HttpClient) {}

  // Call the PDF WhatsApp sending endpoint
  sendPrescription(patientId: number): Observable<any> {
    const url = `${this.baseUrl}/patients/${patientId}/send-prescription`;
    return this.httpClient.put(url, {}, { responseType: 'text' as 'json' }); // Empty body, response is text
  }
  assignMedicines(patientId: number, data: any): Observable<any> {
    return this.httpClient.put(`${BASE_URL}/api/v1/patients/${patientId}/add-medicine`, data);
  }
  
}
