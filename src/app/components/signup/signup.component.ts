import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  
  signupForm!: FormGroup;
  data!: any;

  constructor(
    private authService:AuthService,
    private router: Router,
    private toastr: ToastrService
  ){}

  ngOnInit(){
    this.signupForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phoneNumber': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'repeatpassword': new FormControl(null, [Validators.required]),
    })

    
  }

  onSignUp(){


    console.log(this.signupForm.value)
    this.authService.signUp(this.signupForm.value).subscribe(
      (response)=> {

        this.data = response
        console.log('data'+this.data.message)

        if(this.data.status == 1){
          this.router.navigate(['/sign-in'])

          this.toastr.success(
            this.data.message,
            'Success',
            { timeOut: 1500, progressBar: true }
          );
        }

        if(this.data.status == 0){

          
          this.toastr.error(
            this.data.message,
            'Error',
            { timeOut: 1500, progressBar: true }
          );
          
        }
      },
      (error)=>{
        console.log(error)
      }
    );
  }
}
