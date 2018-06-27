import { AfterViewInit, Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LayoutWidths } from '../layout/layout.model';
import { LayoutService } from '../layout/layout.service';

@Directive({
  selector: '[bfEditPanel]'
})
export class EditPanelDirective implements OnInit, AfterViewInit, OnDestroy {

  private element: any;
  private previousSibling: any;
  private parentElement: any;
  private contentContainer: any;
  private widths: { [key: string]: number };
  private onDestroy = new Subject();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private layoutService: LayoutService
  ) {}

  /**
   * OnInit life cycle method.
   */
  ngOnInit() {
    this.element = this.elementRef.nativeElement;
    this.previousSibling = this.element.previousElementSibling;
    this.setParentElements(this.element);
  }

  /**
   * AfterViewInit life cycle method.
   */
  ngAfterViewInit() {
    this.layoutService.getWidths()
        .pipe(takeUntil(this.onDestroy))
        .subscribe((widths: LayoutWidths) => {
          this.widths = widths;
          this.setWidths();
          setTimeout(() => {
            this.setElementLayout();
          });
        });

    this.renderer.listen(this.contentContainer, 'scroll', () => {
      this.setElementLayout();
    });
  }

  /**
   * OnDestroy life cycle method.
   */
  ngOnDestroy() {
    this.onDestroy.next();
    this.renderer.removeStyle(this.parentElement, 'width');
  }

  /**
   * Sets the `parentElement` and `contentContainer`. `contentContainer` should always be the
   * element with the `className` `bf-content` and `parentElement` should always be it's first
   * child element.
   * @param {*} childElement
   */
  setParentElements(childElement: any) {
    const element = childElement.parentElement;

    if (element.className !== 'bf-content') {
      this.setParentElements(element);
    } else {
      this.contentContainer = element;
      this.parentElement = element.firstElementChild.nextSibling;
    }
  }

  /**
   * Sets the content container and element widths.
   */
  setWidths() {
    this.renderer.setStyle(this.element, 'width', `${this.widths.editWidth}px`);
    this.renderer.setStyle(this.parentElement, 'width', `${this.widths.contentWidth}px`);
  }

  /**
   * Sets the element layout.
   */
  setElementLayout() {
    // Element position top.
    const contentContainerClientRect = this.contentContainer.getBoundingClientRect();
    const parentElementClientRect = this.parentElement.getBoundingClientRect();
    const previousSiblingClientRect = this.previousSibling.getBoundingClientRect();
    const previousSiblingOffsetTop = this.previousSibling.offsetTop;
    const elementClientRect = this.element.getBoundingClientRect();

    const initialPreviousSiblingPositionTop =
      contentContainerClientRect.top + previousSiblingOffsetTop;
    const elementPositionTop =
      initialPreviousSiblingPositionTop < previousSiblingClientRect.top
        ? initialPreviousSiblingPositionTop
        : previousSiblingClientRect.top;
    const minimumPositionTop = 80;

    if (elementPositionTop > minimumPositionTop) {
      this.renderer.setStyle(this.element, 'top', `${elementPositionTop}px`);
    } else {
      this.renderer.setStyle(this.element, 'top', `${minimumPositionTop}px`);
    }

    // Element height.
    const contentContainerOffsetHeight = this.contentContainer.offsetHeight;
    const contentContainerScrollHeight = this.contentContainer.scrollHeight;
    const contentContainerScrollTop = this.contentContainer.scrollTop;

    const scrollBottom = contentContainerScrollHeight - contentContainerScrollTop;
    const maxBottomSpace = 116;
    let bottomSpace =
      scrollBottom - maxBottomSpace + 36 < contentContainerOffsetHeight
        ? contentContainerOffsetHeight - (scrollBottom - maxBottomSpace + 36) + 36
        : 36;
    bottomSpace = bottomSpace > 36 ? bottomSpace : 36;

    this.renderer.setStyle(this.element, 'bottom', `${bottomSpace}px`);

    this.renderer.removeStyle(this.element, 'height');
    this.renderer.setStyle(this.element, 'height', `${this.element.offsetHeight}px`);

    // Child element height.
    this.renderer.removeStyle(this.element.firstElementChild, 'height');
    this.renderer.setStyle(
      this.element.firstElementChild,
      'height',
      `${this.element.firstElementChild.offsetHeight}px`
    );
  }
}
