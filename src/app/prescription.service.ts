import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from './constants'; // Optional centralized base URL

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private baseUrl = `${BASE_URL}/api/v1/prescriptions`; 

  constructor(private http: HttpClient) {}

  // Call the PDF WhatsApp sending endpoint
  sendPrescription(patientId: number): Observable<any> {
    const url = `${this.baseUrl}/patients/${patientId}/send-prescription`;
    return this.http.put(url, {}, { responseType: 'text' as 'json' }); // Empty body, response is text
  }
}
