import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
],
imports: [
    FormsModule,
    AuthRoutingModule,
    SharedModule
]
})
export class AuthModule {

}