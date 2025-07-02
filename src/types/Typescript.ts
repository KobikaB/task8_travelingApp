export interface FormData {
  email: string;
  Password:  string;
  role:"passenger" | "vowner" | "";
}
export type UserRole = "passenger" | "vowner" | "";

export interface Tconfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface RegisterPage {
  Fname: string;
  Lname: string;
  email: string;
  Password: string;
  ConfirmPassword: string;
  role: string;
}


export interface Booking {
  id: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  pickupTime: string;
  numberofPassengers: number;
  vehicleId: string;
}



export interface  PassengerFormData {
  name: string;
  fees: number;
  seats: number;
  available: boolean;
  images: string[];
  type:string,
}


export interface vehicleFormData {
  model:string,
  seats:number | undefined,
  type:string,
  licensePlate:string,
  fees:number|undefined,
  available:false

}


export interface Vehicles{
  id:string,
  model:string,
  seats:number,
  type:string,
  licensePlate:string,
  fees:number,
  available:boolean,
  images? : string[],
}


export interface Vehicle {
  id: string;       
  name: string;
  fees: number;
  seats: number;
  
  available: boolean;
}

export interface profileData{
    Fname:string,
        Lname:string,
        email:string,
        avatar:string,
        role:"passenger" | "vowner",
        uid:string,
}

