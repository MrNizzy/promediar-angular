import { Component, HostListener, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-float-help',
    imports: [MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './float-help.component.html',
    styleUrl: './float-help.component.scss'
})
export class FloatHelpComponent {
  dialogRef = inject(MatDialog);
  isDialogOpen = false;
  currentDialogRef: MatDialogRef<FloatHelpDialogComponent> | null = null;

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
        MatTooltipModule,
    ],
    templateUrl: './help.dialog.html'
})
export class FloatHelpDialogComponent {}
