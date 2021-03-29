import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  userService: any;
  showSucessMessage: boolean |any;
  serverErrorMessages: any;
  id:any;
  // result:any;

  // updateData = new FormGroup({
  //   productName : new FormControl(''),
  //   quantity : new FormControl(''),
  //   imgList : new FormControl(''),
  //   status : new FormControl(''),
  //   price : new FormControl(''),
  // })

  updateData ={
    productName : '',
    quantity : '',
    imgList : '',
    status : '',
    price : ''
  }

  constructor(private routes : Router, private router : ActivatedRoute,
    private service : UserService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.service.getData(this.id).subscribe((result:any)=>{
    console.log(result);
      this.updateData = {
        productName : result.product.productName,
        quantity : result.product.quantity,
        imgList : result.product.imgList,
        status : result.product.status,
        price : result.product.price
      }
    })
  }
  onSubmit(form: any) { 
    console.log(form);
    console.log(this.updateData);

    
    this.service.updateProduct(this.updateData,this.id).subscribe(
      (res:any) => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      (err:any) => { 
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }
  
  resetForm(form: any) {
    this.updateData = {
      productName: '',
      quantity: '',
      imgList:'',
      price:'',
      status:''
    };
    this.serverErrorMessages = '';
  }

}

