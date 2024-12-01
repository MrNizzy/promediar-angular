import { Component, HostListener, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AverageService } from '@services/average.service';
import { BreakpointService } from '@services/breakpoint.service';

@Component({
  selector: 'app-float-config',
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './float-config.component.html',
  styleUrl: './float-config.component.scss',
})
export class FloatConfigComponent {
  dialogRef = inject(MatDialog);
  breakpointService = inject(BreakpointService);
  isSmallScreen = signal<boolean>(false);
  isDialogOpen = signal<boolean>(false);
  currentDialogRef: MatDialogRef<FloatConfigDialogComponent> | null = null;

  constructor() {
    this.isSmallScreen = this.breakpointService.isSmallScreen;
  }

  // Open config on I key press event
  @HostListener('document:keydown.i', ['$event'])
  toggleConfig(): void {
    if (this.isDialogOpen()) {
      this.currentDialogRef?.close();
    } else {
      this.isDialogOpen.set(true);
      this.currentDialogRef = this.dialogRef.open(FloatConfigDialogComponent, {
        autoFocus: false,
      });
      this.currentDialogRef.afterClosed().subscribe(() => {
        this.isDialogOpen.set(false);
        this.currentDialogRef = null;
      });
    }
  }
}

@Component({
  selector: 'app-float-config-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatDivider,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './config.dialog.html',
  styles: `
    .save__button {
      background-color: var(--mat-sys-primary-container);
      color: var(--mat-sys-primary);
    }
    .form {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr 1fr;
    }
  `,
})
export class FloatConfigDialogComponent {
  averageService = inject(AverageService);
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    maxPercentage: [
      this.averageService.maxPercentage(),
      [
        Validators.required,
        Validators.min(0),
        Validators.max(1000),
        Validators.pattern(/^\d+$/),
      ],
    ],
    minPassingGrade: [
      this.averageService.minPassingGrade(),
      [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ],
    ],
    maxNote: [
      this.averageService.maxNote(),
      [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ],
    ],
    minValidNote: [
      this.averageService.minValidNote(),
      [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ],
    ],
  });

  save(): void {
    this.averageService.maxPercentage.set(this.form.value.maxPercentage || 100);
    this.averageService.minPassingGrade.set(
      this.form.value.minPassingGrade || 3.0
    );
    this.averageService.maxNote.set(this.form.value.maxNote || 5.0);
    this.averageService.minValidNote.set(this.form.value.minValidNote || 0.0);
  }
}
