import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { UpdateComponent } from './product/update/update.component';
import { ForgetPasswordComponent } from './user/forget-password/forget-password.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
  
const routes: Routes = [
  {path:'',component:MainPageComponent},
  {path:'login',component:SignInComponent},
  {path:'signup',component:SignUpComponent},
  {path:'products', component:ProductComponent},
  {path:'productbyId',component:ProductListComponent},
  {path:'update/:id',component:UpdateComponent},
  {path:'forgetPassword', component:ForgetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
