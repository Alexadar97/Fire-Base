import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

declare var $;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  form:FormGroup
  constructor(private customerService:CustomerService) { }
  formControls = this.customerService.form.controls
  showDetelteMessage:boolean
  customerArray = [];
  ngOnInit() {
    this.customerService.getCustomer().subscribe(
      data=>{
        this.customerArray = data.map(item=>{
          return{
            $key:item.key,
            ...item.payload.val()
          }
        })
      }
    )
  }
  dangermsg:boolean;
  successmsg:boolean;
  updmsg:boolean;
  resetmsg:boolean

  submit(){
    if(this.customerService.form.valid){
      if(this.customerService.form.get('$key').value == null){
        this.customerService.insertCustomer(this.customerService.form.value)
        this.customerService.form.reset();
        this.successmsg = true
        this.updmsg = false
        this.dangermsg = false
        this.resetmsg = false
        setTimeout(()=>this.successmsg = false, 5000)
      }else{
        this.customerService.updateCustomer(this.customerService.form.value)
        this.customerService.form.reset();
        this.updmsg = true
        this.successmsg = false
        this.dangermsg = false
        this.resetmsg = false
        setTimeout(()=>this.updmsg = false, 5000)
       
      }
    }else{
      this.markFormGroupTouched(this.customerService.form);
      this.dangermsg = true
      this.updmsg = false
        this.successmsg = false
        this.resetmsg = false
      setTimeout(()=>this.dangermsg = false, 5000)

    }
  }
  restForm(){
    this.customerService.form.reset();
    this.resetmsg = true
    this.dangermsg = false
      this.updmsg = false
        this.successmsg = false
    setTimeout(()=>this.resetmsg = false, 5000)
  }
    private markFormGroupTouched(formGroup: FormGroup) {
    for (let i in formGroup.controls)
      formGroup.controls[i].markAsTouched();
  }
  deletevalue:any
  delete($key){
    $("#deletemodal").modal("show")
    this.deletevalue = $key
  }
confirmdelete(){
  this.customerService.deleteCustomer(this.deletevalue);
  this.showDetelteMessage = true
  setTimeout(()=>this.showDetelteMessage = false, 5000)
  $("#deletemodal").modal("hide")
}
}
