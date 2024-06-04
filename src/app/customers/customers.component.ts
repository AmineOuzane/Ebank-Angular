import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{

  customers! : any;
  errorMessage! :Observable<Array<Customer>>; // car methode getCustomers() dans service return observable
  searchFormGroup : FormGroup | undefined;

  constructor(private customerService : CustomerService, private fb : FormBuilder) {

  }

  //methode execute au demarage
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")  // donner valeur par default chaine vide
    });

      this.customers=this.customerService.getCustomers().pipe(
        catchError(err => {
          this.errorMessage=err.message;
          return throwError(err);
        })
      );
  }

  handleSearchCustomers() {
    let kw=this.searchFormGroup?.value.keyword;
    this.customers=this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );  }

  handleDeleteCustomer(c: Customer) {
    this.customerService.deleteCustomer(c.id).subscribe({
      next : (resp) =>{
        this.customers = this.customers.pipe(
          map(data => {
            let index = (data as any[]).indexOf(c);
            (data as any[]).splice(index, 1); // Use splice instead of slice to remove the item
            return data;
          })
        );
;
      },
      error : err => {
        console.log(err);
      }
    })
  }
}
