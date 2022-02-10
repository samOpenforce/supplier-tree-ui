import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ReplaySubject, Subject } from 'rxjs';

import {
  CdkVirtualScrollViewport,
  ViewportScrollPosition,
} from '@angular/cdk/scrolling';
import { SideDrawerService } from 'src/app/services/side-drawer.service';
type Position = 'start' | 'mid' | 'end';
export interface Supplier {
  name: string;
  id: string;
}

@UntilDestroy()
@Component({
  selector: 'app-facility-overview',
  templateUrl: './facility-overview.component.html',
  styleUrls: ['./facility-overview.component.scss'],
})
export class FacilityOverviewComponent implements OnInit, AfterViewInit {
  @HostBinding('class') classes = 'full-width';
  @ViewChildren('step') steps!: QueryList<CdkDropList>;
  @ViewChildren(CdkVirtualScrollViewport)
  viewPorts!: QueryList<CdkVirtualScrollViewport>;
  viewportZoomLevel = 1;
  zoomElements!: NodeList;
  tiers = [
    {
      suppliers: [],
      tierType: 'partners',
    },
    {
      suppliers: [],
      tierType: 'facility',
    },
    {
      suppliers: [
        { name: 'Supplier 001', id: '12345678' },
        { name: 'Supplier 002', id: '24555678' },
      ],
    },
    {
      suppliers: [
        { name: 'Supplier 003', id: '82345678' },
        { name: 'Supplier 004', id: '92345678' },
      ],
    },
    {
      suppliers: [
        { name: 'Supplier 005', id: '32345678' },
        { name: 'Supplier 006', id: '62345678' },
      ],
    },
    {
      suppliers: [
        { name: 'Supplier 001', id: '12345678' },
        { name: 'Supplier 002', id: '24555678' },
      ],
    },
    {
      suppliers: [
        { name: 'Supplier 003', id: '82345678' },
        { name: 'Supplier 004', id: '92345678' },
        { name: 'Supplier 003', id: '82345678' },
        { name: 'Supplier 004', id: '92345678' },
        { name: 'Supplier 003', id: '82345678' },
        { name: 'Supplier 004', id: '92345678' },
        { name: 'Supplier 003', id: '82345678' },
        { name: 'Supplier 004', id: '92345678' },
        { name: 'Supplier 003', id: '82345678' },
        { name: 'Supplier 004', id: '92345678' },
      ],
    },
    {
      suppliers: [
        { name: 'Supplier 005', id: '32345678' },
        { name: 'Supplier 006', id: '62345678' },
      ],
    },
    {
      suppliers: [
        { name: 'Supplier 001', id: '12345678' },
        { name: 'Supplier 002', id: '24555678' },
      ],
    },
    {
      suppliers: [
        { name: 'Supplier 003', id: '82345678' },
        { name: 'Supplier 004', id: '92345678' },
      ],
    },
    {
      suppliers: [
        { name: 'Supplier 005', id: '32345678' },
        { name: 'Supplier 006', id: '62345678' },
      ],
    },
  ];

  constructor(
    private renderer: Renderer2,
    private elem: ElementRef,
    private sideDrawerService: SideDrawerService
  ) {}

  ngOnInit(): void {
    console.log('onInit lifecycle');
  }

  ngAfterViewInit() {
    this.zoomElements = this.elem.nativeElement.querySelectorAll('.zoomable');
    console.log(this.zoomElements);
  }

  trackByMethod(index: number, element: any): string {
    return element.id;
  }

  entered(event: any): void {
    console.log(event);
  }

  exited(event: any): void {
    console.log(event);
  }

  scroll(position: Position) {
    let scrollIndex: number;
    switch (position) {
      case 'start':
        scrollIndex = 0;
        break;
      case 'mid':
        scrollIndex = Math.round(this.tiers.length / 2);
        console.log(scrollIndex);
        break;
      case 'end':
        scrollIndex = this.tiers.length;
        break;
    }

    this.viewPorts.forEach((viewport) => {
      viewport.scrollToIndex(scrollIndex, 'smooth');
    });
  }

  dropped(event: CdkDragDrop<Supplier[]>) {
    console.log('main dropped call');
    console.log(event);
    if (
      event.previousContainer.id === 'cdk-drop-list-products' &&
      event.container.id !== 'cdk-drop-list-facility'
    ) {
      return;
    }
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  zoom(level: number | null): void {
    console.log('zoom called with ', level);
    if (level === 1) {
      this.viewportZoomLevel = this.viewportZoomLevel + 0.1;
    } else if (level === 0) {
      this.viewportZoomLevel = this.viewportZoomLevel - 0.1;
    } else {
      this.viewportZoomLevel = 1;
    }
    this.zoomElements.forEach((elem) => {
      this.renderer.setStyle(
        elem,
        'transform',
        `scale(${this.viewportZoomLevel})`
      );
    });
  }

  openDetails(index: number): void {
    this.sideDrawerService.closeLeftDrawer();
    this.sideDrawerService.toggleRightChange();
    this.viewPorts.forEach((viewport) => {
      viewport.scrollToIndex(index, 'smooth');
    });
  }
}
