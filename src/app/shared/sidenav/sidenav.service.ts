import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SidenavState } from './sidenav.model';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private isOpened = new BehaviorSubject<boolean>(false);
  private state = new BehaviorSubject<SidenavState>(null);

  setIsOpened(val: boolean) {
    this.isOpened.next(val);
  }

  getIsOpened(): Observable<boolean> {
    return this.isOpened.asObservable();
  }

  setState(val: SidenavState) {
    this.state.next(val);
  }

  getState(): Observable<SidenavState> {
    return this.state.asObservable();
  }

}
