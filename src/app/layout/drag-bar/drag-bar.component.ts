import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-bar',
  templateUrl: './drag-bar.component.html',
  styleUrls: ['./drag-bar.component.scss'],
})
export class DragBarComponent implements OnInit {
  @HostListener('document:keydown.space', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (this.spaceEngaged) {
      return;
    } else {
      this.spaceEngaged = true;
    }
  }

  @HostListener('document:keyup.space', ['$event']) onKeyupHandler(
    event: KeyboardEvent
  ) {
    console.log(event);
    event.preventDefault();
    event.stopImmediatePropagation();
    this.spaceEngaged = false;
  }
  spaceEngaged = false;
  dragStart = '';
  dragEnd = '';
  constructor() {}

  ngOnInit(): void {}
  onPan(event: any): void {
    console.log(event);
  }
  onPanStart(event: any): void {
    console.log(event.center);
    if (this.spaceEngaged) {
      this.dragStart = event.center;
    }
  }
  onPanMove(event: any): void {
    console.log(event);
  }
  onPanEnd(event: any): void {
    console.log(event.center);
    if (this.spaceEngaged) {
      this.dragEnd = event.center;
    }
  }
  onPanCancel(event: any): void {
    console.log(event);
  }
  onPanLeft(event: any): void {
    console.log(event);
  }
  onPanRight(event: any): void {
    console.log(event);
  }
}
