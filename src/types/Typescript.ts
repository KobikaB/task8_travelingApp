export interface  FormData{
Email:string,
    Password: string,
    role: UserRole,
}
 export type UserRole = "passenger" | "vowner" | "";

export interface Tconfig{

apiKey:string,
  authDomain:string,
  projectId:string,
  storageBucket:string,
  messagingSenderId:string,
  appId:string,
  measurementId:string,
}


export interface RegisterPage{

 Fname: string,
    Lname: string,
    Email: string,
    Password: string,
    ConfirmPassword: string,
    role: string,
}