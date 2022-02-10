import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SideDrawerService } from './services/side-drawer.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'supplier-tree-ui';
  isLeftDrawerOpen = false;
  isRightDrawerOpen = false;
  hasBackdrop = false;

  constructor(private sideDrawerService: SideDrawerService) {}

  ngOnInit() {
    /* LEFT SIDE DRAWER */
    this.sideDrawerService.leftChangeStream$
      .pipe(untilDestroyed(this))
      .subscribe((change: boolean) => {
        console.log('service changed received');
        if (change) {
          this.hasBackdrop = false;
        }
        this.isLeftDrawerOpen = change;
      });

    /* RIGHT SIDE DRAWER */
    this.sideDrawerService.rightChangeStream$
      .pipe(untilDestroyed(this))
      .subscribe((change: boolean) => {
        console.log('right drawer toggle');
        if (change) {
          this.hasBackdrop = true;
        }
        this.isRightDrawerOpen = change;
      });
  }

  public closeDrawers(): void {
    this.sideDrawerService.closeDrawers();
  }
}
