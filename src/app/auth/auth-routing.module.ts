import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReverseAuthGuard } from './reverse-auth.guard';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes=[
{path: '',canActivate:[ReverseAuthGuard], component: AuthComponent,children:[
    {path:'', redirectTo:'login',pathMatch: 'full'},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent}
    ]} 
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [RouterModule]
})
export class AuthRoutingModule {

}