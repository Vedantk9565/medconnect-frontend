import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from './appointment';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  

  constructor(private httpClient:HttpClient) { }
  
  private baseUrl = `${environment.apiUrl}/api/v2/appointments`;
getAllAppointments():Observable<Appointment[]>{
  
  return this.httpClient.get<Appointment[]>(`${this.baseUrl}`);
}
  createAppointment(appointment:Appointment):Observable<Appointment>{
  return this.httpClient.post<Appointment>(`${this.baseUrl}`,appointment);
}
deleteAppointment(id:number):Observable<object>{

  return this.httpClient.delete(`${this.baseUrl}/${id}`);
}
}
