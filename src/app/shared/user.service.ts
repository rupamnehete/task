import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user.mode';
import { Product } from './product.mode'

const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "" })
}

@Injectable({
  providedIn: 'root' 
})
export class UserService {
  selectedUser: User = {
    fName: '', 
    email: '',
    password: '',
    lName:'',
    mobileNumber:''
  }
  selectedProduct: Product = {
    productName:'',
    quantity:'',
    imgList:'',
    price:'',
    status:''
  }

  
  
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  } 

  login(authCredentials: any) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setUserData(data:any){
    localStorage.setItem('userId', data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  postProduct(Product: Product){
    return this.http.post(environment.apiBaseUrl+'/product',Product);
  }

  getProductList() { 
    let userId:any = localStorage.getItem('userId');
    return this.http.get(environment.apiBaseUrl + '/productbyId/?userId='+userId);

  }

  getData(id:any){
    return this.http.get(environment.apiBaseUrl + `/productbyId?id=${id}`);
  }

  updateProduct(data:any,id:any){
    console.log(data);
    return this.http.patch(environment.apiBaseUrl + `/updateProduct/${id}`,
    data);
  }

uploadImg(files:any){
  let formData = new FormData();
formData.append('upload', files);
console.log(formData);

  return this.http.post(environment.apiBaseUrl+'/upload',formData,HttpUploadOptions);
} 

 // sendEmail(data:any) {
  //   return this.http.post(environment.apiBaseUrl+'/forgetPassword',data);
  // }
}