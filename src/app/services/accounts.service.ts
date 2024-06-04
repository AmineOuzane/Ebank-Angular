import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AccountDetails} from "../model/account.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  backendHost : string="http://localhost:8085";
  constructor(private http : HttpClient) { }

  public getAccounts(accountId : string, page : number, size : number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(this.backendHost+"/accounts/id"+accountId+"/pageOperations?page="+page+"/&size="+size)
  }

  public debit(accountId : string, amount : number, description : string){
    let data = {acccountId : accountId, amount }
    return this.http.post(this.backendHost+"/accounts/debit",{accountId : accountId})
  }

}
