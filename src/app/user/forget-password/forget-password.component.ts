import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  loading = false;
  buttonText = "Submit";
  nameFormControl: any;
  emailFormControl: any;
  http: any;
  constructor() { }

  ngOnInit(): void {
  }
  register() {
    alert("Passwors reset Link will be sent on your email. HurryUP It will be expired in 10 min")
    this.loading = true;
    this.buttonText = "";
    let user = {
      email: this.emailFormControl.value
    }
    this.http.sendEmail(user).subscribe(
      (data: any) => {
        let res:any = data; 
      },
      (err: any) => {
        console.log(err);
        this.loading = false;
        this.buttonText = "Submit";
      },() => {
        this.loading = false;
        this.buttonText = "Submit";
      }
    );
    
  }

}
