import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideDrawerService {
  private leftOpen = false;
  private rightOpen = false;

  /* LEFT */
  /**
   * holds the current left drawer open state
   */
  private leftChangeSource = new Subject<boolean>();

  /**
   * consumers subscribe to this to be informed of left drawer open state changes
   */
  public leftChangeStream$ = this.leftChangeSource.asObservable();

  /**
   * consumers use this method to control the open state of the left drawer
   * @param change true: open, false: closed
   */
  public toggleLeftChange = () => {
    this.leftOpen = !this.leftOpen;
    this.leftChangeSource.next(this.leftOpen);
  };

  /* RIGHT */
  /**
   * holds the current right drawer open state
   */
  private rightChangeSource = new Subject<any>();

  /**
   * consumers subscribe to this to be informed of right drawer open state changes
   */
  public rightChangeStream$ = this.rightChangeSource.asObservable();

  /**
   * consumers subscribe to this to be informed of right drawer open state changes
   */
  public toggleRightChange = () => {
    this.rightOpen = !this.rightOpen;
    this.rightChangeSource.next(this.rightOpen);
  };

  /* UTILITY */
  public closeDrawers(): void {
    this.leftOpen = false;
    this.rightOpen = false;
    this.leftChangeSource.next(this.leftOpen);
    this.rightChangeSource.next(this.rightOpen);
  }

  public closeLeftDrawer(): void {
    this.leftOpen = false;
    this.leftChangeSource.next(this.leftOpen);
  }
}
