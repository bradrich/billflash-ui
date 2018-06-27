import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'bf-no-results',
  template: `
    <div class="bf-error-circle">

      <div class="bf-image bf-zoom-in">
        <img [src]="assets.image" alt="Error" />
      </div>

      <h6 class="mt-1 bf-fade-in-up">{{title}}</h6>

      <p class="bf-fade-in-up">
        {{message}}
        <span *ngIf="showCreateEntity">or</span>
      </p>

      <button
        class="btn btn-primary btn-raised bf-fade-in-up"
        (click)="createEntity.emit()"
        *ngIf="showCreateEntity">
        Create entity
      </button>

    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoResultsComponent implements OnInit {

  @Input() title = 'No Results';
  @Input() message = 'Try adjusting your search or filter to find what you are looking for';

  @Input()
  get showCreateEntity(): boolean { return this._showCreateEntity; }
  set showCreateEntity(v) { this._showCreateEntity = coerceBooleanProperty(v); }
  @Output() createEntity = new EventEmitter<any>();

  assets: any;

  private _showCreateEntity = false;

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.assets = {
      image: null
    };
  }

}
