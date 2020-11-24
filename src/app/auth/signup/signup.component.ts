import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading=false;
  error:string=null;

  constructor(private authService:AuthService,private router:Router) {

    }
  ngOnInit() {

  }

  onClose() {
      this.error=null;
  }

  onSwitchMode() {
    this.router.navigate(['/auth']);
  }

  onSubmit(form:NgForm) {
    
      const username=form.value.username;
      const password=form.value.password;

      this.isLoading=true;
             
      this.authService.signup(username,password).subscribe(resData=>{
          if(!resData.valid)
          this.error="An error occured! User Already Exists";
          else{
          this.error=null;
          this.router.navigate(['/articles']);
      }
          this.isLoading=false;
      });

      form.reset();
  }
}
