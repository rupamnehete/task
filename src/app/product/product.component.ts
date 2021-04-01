import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  showSucessMessage: boolean | any;
  serverErrorMessages: string |any;
  public isVisible: boolean = false;
  alertmsg:String |any;
  registrationForm = this.fb.group({
    file: [null]
  })  

  constructor(public userService : UserService, private routes : Router,public fb: FormBuilder,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  onSubmit(form: any) { 
  console.log(form);
  let userId:any = localStorage.getItem('userId');
form.value['userId'] = userId;
// console.log(JSON.parse(JSON.stringify(user))._id);
var retrievedObject:any
retrievedObject = localStorage. getItem('userId');
console.log(JSON.stringify(userId));
retrievedObject = JSON.stringify(userId);
console.log(retrievedObject);


console.log('retrievedObject: ', JSON. parse(retrievedObject));

if(form.valid){
      this.userService.postProduct(form.value).subscribe(
      (result:any) => {
        setTimeout(() => this.routes.navigateByUrl('/productbyId'),1500);
        console.log(result);
        // this.isVisible = true;
        if (result.status){this.showAlert(result.message)}
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
}else{
  this.showAlert("Please Enter All Details");
}
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
 
  showAlert(msg:any) : void {
    // console.log(msg);
    if (this.isVisible) { 
      return;
    } 
    this.alertmsg = msg
        this.isVisible = true;
    setTimeout(()=> this.isVisible = false,2500)
  }

  uploadImg(img:any){
    
  }

  imageUrl: any = "https://i.ibb.co/fDWsn3G/buck.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;

  uploadFile(event:any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registrationForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }

  onSubmitImg() {
    // this.submitted = true;
    if(!this.registrationForm.valid) {
      alert('Please fill all the required fields!!!')
      // return false;
    } else {
      console.log(this.registrationForm.value)
      this.userService.uploadImg(this.registrationForm.value).subscribe((result:any)=>{
        console.log(result);
        
      })
    }
  }

  Logout(){
    localStorage.clear()
  }
}
