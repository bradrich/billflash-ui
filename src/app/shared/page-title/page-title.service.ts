import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class PageTitleService {

  get title(): string {
    return this._title;
  }
  set title(title: string) {
    this._title = title;
    if (title !== '') {
      title = `${title} | `;
    }
    this.titleService.setTitle(title);
  }

  private _title = '';

  constructor(
    private titleService: Title
  ) {}

}
