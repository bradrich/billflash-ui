import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import {
  spinnerChasingDotsTemplate,
  spinnerCircleTemplate,
  spinnerCubeGridTemplate,
  spinnerDoubleBounceTemplate,
  spinnerFadingCircleTemplate,
  spinnerFoldingCubeTemplate,
  spinnerPulseTemplate,
  spinnerRotatingPlaneTemplate,
  spinnerThreeBounceTemplate,
  SpinnerType,
  spinnerWanderingCubeTemplate,
  spinnerWaveTemplate
} from './spinner.constants';

@Component({
  selector: 'bf-spinner',
  template: `
    <div #inner></div>
    <p *ngIf="message"><strong><i>{{message}}</i></strong></p>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnChanges {

  @Input() type: SpinnerType = 'threeBounce';
  @Input() message: string;
  @ViewChild('inner') target: ElementRef;

  private isViewInitialized = false;

  constructor(
    private renderer: Renderer2
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.isViewInitialized = true;

    this.updateView();
  }

  /**
   * OnChanges life-cycle method.
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges) {
    this.updateView();
  }

  /**
   * Updates the view of the component with the correct template.
   */
  updateView() {
    if (!this.isViewInitialized) {
      return;
    }

    // Select template to match type.
    let template;
    switch (this.type) {

      case 'chasingDots':
        template = spinnerChasingDotsTemplate;
        break;

      case 'circle':
        template = spinnerCircleTemplate;
        break;

      case 'cubeGrid':
        template = spinnerCubeGridTemplate;
        break;

      case 'doubleBounce':
        template = spinnerDoubleBounceTemplate;
        break;

      case 'fadingCircle':
        template = spinnerFadingCircleTemplate;
        break;

      case 'foldingCube':
        template = spinnerFoldingCubeTemplate;
        break;

      case 'pulse':
        template = spinnerPulseTemplate;
        break;

      case 'rotatingPlane':
        template = spinnerRotatingPlaneTemplate;
        break;

      case 'threeBounce':
        template = spinnerThreeBounceTemplate;
        break;

      case 'wanderingCubes':
        template = spinnerWanderingCubeTemplate;
        break;

      case 'wave':
        template = spinnerWaveTemplate;
        break;

      default:
        template = spinnerFoldingCubeTemplate;
        break;

    }

    // Append template to view child.
    this.target.nativeElement.innerHTML = template;
  }

}
