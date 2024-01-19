import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollHandleService {

  headerHeight$ = new BehaviorSubject<number>(0);



  constructor() { }



  setHeaderHeight(height: number) {
    this.headerHeight$.next(height);
  }
}
