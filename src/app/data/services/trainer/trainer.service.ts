import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CurrentWordInterface} from "../../interfaces/currentWord.interface";

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private _currentWord = new BehaviorSubject<CurrentWordInterface>(
    {word: '', translation: '', isSuccessful: false});

  currentWordStatus = this._currentWord.asObservable();

  setCurrentWordStatus(word: CurrentWordInterface) {
    this._currentWord.next(word);
  }
}
