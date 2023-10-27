import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  formdata = {name: "", email:"", password:""};
  submit = false;
  errorMessage = "";
  loading = false;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit(){
    
    this.loading = true;
    
    // call register service
    this.auth
    .register(this.formdata.name, this.formdata.email, this.formdata.password )
    .subscribe({
      next:data=>{
        //store token 
        this.auth.storeToken(data.idToken);
        console.log('Register success! idtoken is '+ data.idToken);
        this.auth.canAuthenticate();
        
      },
      error:data=>{
        if (data.error.error.message=="INVAILD_EMAIL") {

          this.errorMessage = "Invalid email address!";

        } else if (data.error.error.message=="EMAIL_EXISTS") {

          this.errorMessage = "Email already exists!";

        }else{
        
          this.errorMessage = "Something went wrong!";
        }
      }
    }).add(()=> {
        this.loading = false;
        console.log('Register completed!');
      })
    }
  }
