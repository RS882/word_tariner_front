import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _isLoad = new BehaviorSubject<boolean>(false);

  loadStatus = this._isLoad.asObservable();

  show(): void {
    this._isLoad.next(true);
  }

  hide(): void {
    this._isLoad.next(false);
  }

  get isLoading(): boolean {
    return this._isLoad.value;
  }
}
