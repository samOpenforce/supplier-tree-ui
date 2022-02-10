import { Component, OnInit } from '@angular/core';
import { SideDrawerService } from 'src/app/services/side-drawer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private sideDrawerService: SideDrawerService) {}

  ngOnInit(): void {}

  toggleLeftDrawer(): void {
    this.sideDrawerService.toggleLeftChange();
  }
}
