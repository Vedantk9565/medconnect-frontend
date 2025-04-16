import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from './patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = "http://localhost:8080/api/v1/patients";

  constructor(private httpclient: HttpClient) { }

  getPatientList(): Observable<Patient[]> {
    return this.httpclient.get<Patient[]>(`${this.baseUrl}`);
  }

  delete(id: number): Observable<object> {
    return this.httpclient.delete(`${this.baseUrl}/${id}`);
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.httpclient.post<Patient>(`${this.baseUrl}`, patient);
  }

  getPatientById(id: number): Observable<Patient> {
    return this.httpclient.get<Patient>(`${this.baseUrl}/${id}`);
  }

  updatePatient(id: number, patient: Patient): Observable<object> {
    return this.httpclient.put(`${this.baseUrl}/${id}`, patient);
  }

  // ✅ NEW METHOD: Send prescription via WhatsApp
  sendPrescription(id: number, request: { phoneNumber: string, message: string }): Observable<any> {
    return this.httpclient.put(`${this.baseUrl}/${id}/send-prescription`, request);
  }
}
