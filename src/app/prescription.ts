// prescription.ts
import { Medicine } from "./medicine";

export class Prescription {
  medicineId: number | null=null;
  dosage!: string;
  timeToTake: string[] = []; // Array of times (e.g., ['Morning', 'Night'])
}