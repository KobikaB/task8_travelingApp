export interface FormData {
  email: string;
  password: string;
  role: "passenger" | "vowner" | "";
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
  id?: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  pickupTime: string;
  numberofPassengers: number | undefined;
  vehicleId?: string;
}



export interface VehiclesData {
  id?: string;
  model: string;
  seats: number | undefined;
  type: string;
  licensePlate: string;
  fees: number | undefined;
  available: boolean;
  images?: string[];
  name?: string;
}

export interface profileData {
  Fname: string;
  Lname: string;
  email: string;
  avatar: string;
  role: "passenger" | "vowner";
  uid: string;
}

export interface cloudinaryData {
  cloudName: string;
  uploadPreset: string;
  folder?: string;
  apiKey: string;
}

// export interface AuthContextType {
//   user: User | null;
//   logout: () => void;
// }

// export interface User {
//   uid: string;
//   role: "passenger" | "vowner";
  
// }

