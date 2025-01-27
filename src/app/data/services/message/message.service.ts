import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private _message = new BehaviorSubject<string>('');

  messageStatus = this._message.asObservable();

  show(message:string): void {
    this._message.next(message);
  }

  hide(): void {
    this._message.next('');
  }
}
