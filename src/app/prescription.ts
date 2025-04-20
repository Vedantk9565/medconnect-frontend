// prescription.ts
import { Medicine } from "./medicine";

export class Prescription {
  id: number = 0;
  dosage: string = "";
  timeToTake: string[] = []; // array of strings: ['Morning', 'Night']
  medicine!: Medicine; // make sure this maps to the actual Medicine class
}
