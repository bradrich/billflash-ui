import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { LayoutWidths } from './layout.model';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private widths = new BehaviorSubject<LayoutWidths>(null);

  setWidths(val: LayoutWidths) {
    this.widths.next(val);
  }

  getWidths(): Observable<LayoutWidths> {
    return this.widths.asObservable();
  }

}
