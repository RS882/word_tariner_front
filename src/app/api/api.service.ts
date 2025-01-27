import {inject, Injectable} from '@angular/core';
import {catchError, EMPTY, finalize, Observable, tap} from "rxjs";
import {LoadingService} from "../data/services/loading/loading.service";
import {ErrorService} from "../data/services/error/error.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  loading = inject(LoadingService);

  errors = inject(ErrorService);

  handleRequest<T>(
    request$: Observable<T>,
    onSuccess: (res: T) => void,
    onError?: (err: any) => void,
    onComplete?: () => void
  ): Observable<T> {
    this.loading.show();
    return request$.pipe(
      tap(res => onSuccess(res)
      ),
      catchError(err => {
        if (onError) onError(err);
        this.errors.show(this.getErrorsMsgs(err))
        return EMPTY;
      }),
      finalize(() => {
        if (onComplete) onComplete();
        this.loading.hide();
      })
    );
  }

  private getErrorsMsgs(_err: any): string[] {
    if (!_err) return ['Some error occurred ...'];
    if (_err?.error?.message) return [_err.error.message];
    if (_err?.error?.errors && Array.isArray(_err.error.errors)) {
      return _err.error.errors.map((e: { message: string }) => e.message);
    }
    return ['Some error occurred ...'];
  }
}

