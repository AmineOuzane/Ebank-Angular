import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
//import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent {
  newCustomerFormGroup! : FormGroup;

  constructor(private fb : FormBuilder, private  customerService: CustomerService) {
    this.newCustomerFormGroup=this.fb.group({
        name : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
        email : this.fb.control(null, [Validators.email, Validators.required])

    })
  }

  handleSaveCustomer() {
    let customer=this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next : data=>{
        alert("Customer has been successfully saved !");
      },
        error : err => {
        console.log(err);
        }
    });
  }
}
