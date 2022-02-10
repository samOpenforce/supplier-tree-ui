import { Component, OnInit } from '@angular/core';
import { SideDrawerService } from 'src/app/services/side-drawer.service';

@Component({
  selector: 'app-right-drawer',
  templateUrl: './right-drawer.component.html',
  styleUrls: ['./right-drawer.component.scss'],
})
export class RightDrawerComponent implements OnInit {
  constructor(private sideDrawerService: SideDrawerService) {}

  ngOnInit(): void {}

  toggleRightDrawer(): void {
    this.sideDrawerService.closeLeftDrawer();
    this.sideDrawerService.toggleRightChange();
  }
}
