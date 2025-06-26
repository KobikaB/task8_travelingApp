export interface FormData {
  Email: string;
  Password: string;
  role: UserRole;
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
  Email: string;
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
}


export interface vehicleFormData {
  model:string,
  seats:number,
  type:string,
  licensePlate:string,
  fees:number,
  available:false

}


