import { AverageService } from '@services/average.service';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-promediar',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './promediar.component.html',
  styleUrl: './promediar.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic',
      },
    },
  ],
})
export class PromediarComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  dialogRef = inject(MatDialog);
  average = inject(AverageService);
  open = false;

  form = this.formBuilder.group({
    average: [0, Validators.required],
    notes: this.formBuilder.array([this.newNote()]),
  });

  get notes(): FormArray {
    return this.form.get('notes') as FormArray;
  }

  ngOnInit(): void {
    console.log('PromediarComponent initialized');
  }

  newNote(): FormGroup {
    return this.formBuilder.group({
      note: [0, [Validators.required]],
      percentage: [0, Validators.required],
    });
  }

  @HostListener('document:keydown.+', ['$event'])
  addNote() {
    this.notes.push(this.newNote());
  }

  removeNote(index: number) {
    this.notes.removeAt(index);
  }

  @HostListener('document:keydown.-', ['$event'])
  removeLastNote() {
    if (this.notes.length > 1) {
      this.notes.removeAt(this.notes.length - 1);
    }
  }

  @HostListener('document:keydown.r', ['$event'])
  reset() {
    this.form.reset();
    if (this.notes.length === 1 || this.open) {
      return;
    }
    this.notes.clear();
    this.notes.push(this.newNote());
  }

  @HostListener('document:keydown.p', ['$event'])
  calculateAverage(): void {
    this.average.calculateAverage(this.notes.value);
    this.form.controls['average'].setValue(this.average.average());
    this.calculatePassingGrade();

    if (!this.open) {
      this.open = true;

      const dialogRef = this.dialogRef.open(AverageComponent, {
        autoFocus: false,
      });

      dialogRef.afterClosed().subscribe(() => {
        this.open = false;
      });
    }
  }

  calculatePassingGrade(): void {
    this.average.calculatePassingGrade(
      this.average.average(),
      this.notes.value.reduce(
        (acc: number, note: { note: number; percentage: number }) =>
          acc + note.percentage,
        0
      )
    );
  }
}

@Component({
  selector: 'app-average',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './average.component.html',
})
export class AverageComponent {
  dialogRef = inject(MatDialogRef<AverageComponent>);
  average_ = inject(AverageService);

  average = this.average_.average();
  passingGrade = this.average_.passingGrade();
}
