import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
    this.router.navigate(['/auth','signup']);
  }

  onSubmit(form:NgForm) {

      const username=form.value.username;
      const password=form.value.password;

      this.isLoading=true;

          this.authService.login(username,password).subscribe(resData=>{
          if(!resData.valid) {
          this.error="An error Occured! Invalid Username or Password";
          }
          else{
          this.error=null;
          this.router.navigate(['/articles']);
          }
          this.isLoading=false;
          })

      
      form.reset();
  }

}
