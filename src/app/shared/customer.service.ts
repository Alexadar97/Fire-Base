import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firebase:AngularFireDatabase) { }
  customerlist:AngularFireList<any>;
  emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  form = new FormGroup({
    $key : new FormControl(null),
    name : new FormControl(null,Validators.required),
    email : new FormControl(null,Validators.compose([Validators.required, Validators.pattern(this.emailvalidation)])),
    mobile : new FormControl(null,Validators.required),
    location : new FormControl(null,Validators.required),
  })

 
  getCustomer(){
    this.customerlist=this.firebase.list('customers');
    return this.customerlist.snapshotChanges();
  }
  insertCustomer(customer){
   this.customerlist.push({ 
    name:customer.name,
    email:customer.email,
    mobile:customer.mobile,
    location:customer.location
   })
  }

  edit(data){
    this.form.setValue(data)
  }
  updateCustomer(data){
    this.customerlist.update(data.$key,{
      name:data.name,
      email:data.email,
      mobile:data.mobile,
      location:data.location
    })
  }
  deleteCustomer($key: string){
    this.customerlist.remove($key)
  }
}
