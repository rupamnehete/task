import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public isVisible: boolean = false;
  alertmsg:String |any;

  constructor(private userService: UserService,private router : Router) { }

  model ={
    email :'',
    password:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string | any;
  ngOnInit() {
  }

  onSubmit(form : NgForm){
    if(form.valid){
    this.userService.login(form.value).subscribe(
      (res:any) => {
        console.log(res);
        
        this.userService.setUserData(res['userId']._id);
        this.userService.setToken(res['token']);
        // alert("login succesfully")
        this.showAlert("login Successfully...")
        setTimeout(()=>this.router.navigateByUrl('/productbyId'),1500)

      },
      err => {
        this.showAlert(err.error.message)
        this.serverErrorMessages = err.error.message;
      }
    );
  }else{
    this.showAlert("Please Enter All Details");
  }
  }

  showAlert(msg:any) : void {
    // console.log(msg);
    if (this.isVisible) { 
      return;
    } 
    this.alertmsg = msg
        this.isVisible = true;
    setTimeout(()=> this.isVisible = false,2500)
  }

  }



