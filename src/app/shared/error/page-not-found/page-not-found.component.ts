import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bf-page-not-found',
  template: `
    <div class="bf-image bf-zoom-in">
      <img [src]="assets.image" alt="Error" />
    </div>

    <h6 class="mt-1 bf-fade-in-up">Page Not Found</h6>

    <p class="bf-fade-in-up">The page you are looking for does not exist!</p>
  `
})
export class PageNotFoundComponent implements OnInit {

  assets: any;

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.assets = {
      image: null
    };
  }

}
