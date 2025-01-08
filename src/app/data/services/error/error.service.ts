import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private _errorMsg = new BehaviorSubject<string[]>([]);

  errorStatus = this._errorMsg.asObservable();

  show(messages:string[]): void {
    this._errorMsg.next(messages);
  }

  hide(): void {
    this._errorMsg.next([]);
  }
}
