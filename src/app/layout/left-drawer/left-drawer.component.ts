import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SideDrawerService } from 'src/app/services/side-drawer.service';

export interface Product {
  name: string;
  id: string;
}

@UntilDestroy()
@Component({
  selector: 'app-left-drawer',
  templateUrl: './left-drawer.component.html',
  styleUrls: ['./left-drawer.component.scss'],
})
export class LeftDrawerComponent implements OnInit {
  @ViewChild('productDropList') productDropList!: CdkDropList;

  products: Array<Product> = [
    {
      name: 'product 1',
      id: 'prod001',
    },
    {
      name: 'product 2',
      id: 'prod002',
    },
    {
      name: 'product 3',
      id: 'prod003',
    },
  ];

  constructor(private sideDrawerService: SideDrawerService) {}

  ngOnInit(): void {}
  dropped(event: CdkDragDrop<Product[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      return;
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log('side dropped call');
      return;
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  toggleLeftDrawer(): void {
    this.sideDrawerService.toggleLeftChange();
  }
}
