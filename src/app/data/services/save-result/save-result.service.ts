import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SaveResultService {

  private _isUrlChanged = new BehaviorSubject<boolean>(false);
  urlChangedStatus = this._isUrlChanged.asObservable();

  showModal(): void {
    this._isUrlChanged.next(true);
  }

  hideModal(): void {
    this._isUrlChanged.next(false);
  }
}
