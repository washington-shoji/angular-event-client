import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appOutsideClickDirective]',
  standalone: true,
})
export class OutsideClickDirective implements OnInit, OnDestroy {
  outSideClicked = output<void>();
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.listener = this.renderer.listen(
      'document',
      'click',
      this.onDocumentClick
    );
  }

  ngOnDestroy(): void {
    if (this.listener) {
      this.listener();
    }
  }

  onDocumentClick = (event: Event) => {
    if (!this.element.nativeElement.parentElement.contains(event.target)) {
      this.outSideClicked.emit();
    }
  };

  private listener: (() => void) | undefined;
}
