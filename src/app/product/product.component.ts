import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  showSucessMessage: boolean | any;
  serverErrorMessages: string |any;

  constructor(public userService : UserService) { }

  ngOnInit(): void {
  }
  onSubmit(form: any) { 
    this.userService.postProduct(form.value).subscribe(
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
  
  resetForm(form: any) {
    this.userService.selectedProduct = {
      productName: '',
      quantity: '',
      imgList:'',
      price:'',
      status:''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
