import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable, OnInit, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  breakpoint_ = inject(BreakpointObserver);
  isSmallScreen = signal<boolean>(false);

  constructor() {
    this.breakpoint_.observe(Breakpoints.XSmall).subscribe((result) => {
      this.isSmallScreen.set(result.matches);
    });
  }
}
