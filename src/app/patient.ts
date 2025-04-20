import { Prescription } from "./prescription"; // adjust path as needed

export class Patient {
  id: number = 0;
  name: string = "";
  age: string = "";
  blood: string = "";
  prescription: Prescription[] = []; // ✅ now strongly typed
  dose: string = "";
  fees: string = "";
  urgency: string = "";
  phoneNumber: string = "";
}
