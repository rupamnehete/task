import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productDetails :any;
  _id:any;
  searchText:any;
  productName: any;
  constructor(private userService: UserService, private router: Router) {
    
  }
 
  ngOnInit() {
    this.userService.getProductList().subscribe(
      (res:any) => {
        this.productDetails = res['product'];
        console.log(this.productDetails);        
      },
      err => { 
        console.log(err); 
      }
    );
  }

  // update(){

  // }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  // navigate(){
  //   this.router.navigate(['/update']);
  // }

  updateUrl(_id:any){
console.log(_id);
    this.router.navigate([`/update/${_id}`])
  }

  search(){
    if(this.productName ==""){
      this.ngOnInit();
    }else{
      this.productDetails = this.productDetails.filter((res:any) =>{
        return res.productName.toLocaleLowerCase().match(this.productName.toLocaleLowerCase());
      });
    }
  }
}