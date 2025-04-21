import { Prescription } from "./prescription";

export class Patient {
    id:number=0;
    name:string="";
    age:string="";
    blood:string="";
    prescription: Prescription[] = [];
    dose:string="";
    fees:string="";
    urgency:string="";
    phoneNumber: string="";

}
