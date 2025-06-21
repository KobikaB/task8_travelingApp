export interface  FormData{
Email:string,
    Password: string,
    role: string,
}
 

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