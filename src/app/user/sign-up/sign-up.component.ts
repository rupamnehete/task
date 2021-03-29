import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean | any;
  serverErrorMessages: string | any;
  email:any;
  firstname:any;
password:any;  


  constructor(public userService: UserService) { 
    // userService.selectedUser.firstname
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) { 
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    ); 
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fName: '',
      email: '',
      password: '',
      lName:'', 
      mobileNumber:''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
}
