
export class Patient {
    id:number=0;
    name:string="";
    age:string="";
    blood:string="";
    prescription: { drugName: string, timeToTake: string }[] = [];
    dose:string="";
    fees:string="";
    urgency:string="";
    phoneNumber: string="";

}
