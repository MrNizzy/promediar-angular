import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreakpointService } from '@services/breakpoint.service';

@Component({
  selector: 'app-float-help',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './float-help.component.html',
  styleUrl: './float-help.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatHelpComponent {
  dialogRef = inject(MatDialog);
  breakpointService = inject(BreakpointService);
  isSmallScreen = signal<boolean>(false);
  isDialogOpen = false;
  currentDialogRef: MatDialogRef<FloatHelpDialogComponent> | null = null;

  constructor() {
    this.isSmallScreen = this.breakpointService.isSmallScreen;
  }

  // Open help on H key press event
  @HostListener('document:keydown.h', ['$event'])
  toggleHelp(): void {
    if (this.isDialogOpen) {
      this.currentDialogRef?.close();
    } else {
      this.isDialogOpen = true;
      this.currentDialogRef = this.dialogRef.open(FloatHelpDialogComponent, {
        autoFocus: false,
      });
      this.currentDialogRef.afterClosed().subscribe(() => {
        this.isDialogOpen = false;
        this.currentDialogRef = null;
      });
    }
  }
}

@Component({
  selector: 'app-float-help-dialog',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatDividerModule,
  ],
  templateUrl: './help.dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .center-text {
      display: flex;
      align-items: center;
      justify-content: start;
      gap: 0.5rem;
      padding: 0.5rem;
    }
    `,
})
export class FloatHelpDialogComponent {}
