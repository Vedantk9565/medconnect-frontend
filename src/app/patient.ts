import { Prescription } from "./prescription";

export class Patient {
    id?: number;
    name!: string;
    age!: number;
    blood!: string;
    phoneNumber!: string;
    fees!: number;
    prescription: Prescription[] = []; // Array of prescriptions
  }