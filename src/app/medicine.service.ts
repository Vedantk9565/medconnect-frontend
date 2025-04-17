import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicine } from './medicine';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private httpClient:HttpClient) { }
  private baseUrl = `${environment.apiUrl}/api/v3`;
  

  getMedicines():Observable<Medicine[]>
  {

    return this.httpClient.get<Medicine[]>(`${this.baseUrl}/medicines`);
  }

    createMedicine(medicine:Medicine):Observable<Medicine>
    {

      return this.httpClient.post<Medicine>(`${this.baseUrl}/medicines`,medicine);
    }
    getMedicineById(id:number):Observable<Medicine>{

      return this.httpClient.get<Medicine>(`${this.baseUrl}/medicines/${id}`);
    }
    updateMedicine(id:number,medicine:Medicine):Observable<object>{
      return this.httpClient.put<Medicine>(`${this.baseUrl}/medicines/${id}`,medicine);
    }

    delete(id:number):Observable<object>{
      return this.httpClient.delete(`${this.baseUrl}/medicines/${id}`);
    }
    
}


