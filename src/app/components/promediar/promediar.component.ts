import { AverageService } from '@services/average.service';
import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
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
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-promediar',
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
  averageService = inject(AverageService);
  toastr = inject(ToastrService);
  average = signal<number>(0);
  open = false;

  form = this.formBuilder.group({
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
      note: [null, [Validators.required]],
      percentage: [null, Validators.required],
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
    this.newNote();
    this.toastr.info('Notas reiniciadas', '¡Listo!');
  }

  @HostListener('document:keydown.p', ['$event'])
  calculateAverage(): void {
    if (this.form.invalid) {
      this.toastr.error('Por favor, llena todos los campos', '¡Oops!');
      return;
    }

    this.averageService.notes.set(this.notes.value); // Save notes on service for use in dialog

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
}

@Component({
  selector: 'app-average',
  imports: [MatDialogModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './average.component.html',
})
export class AverageComponent implements OnInit {
  dialogRef = inject(MatDialogRef<AverageComponent>);
  averageService = inject(AverageService);

  average = signal<number>(0);
  passingGrade = signal<number>(0);
  restPercentage = signal<number>(0);

  ngOnInit(): void {
    this.average.set(this.averageService.calculateAverage());
    this.passingGrade.set(this.averageService.calculatePassingGrade());
    this.restPercentage.set(this.averageService.restPercentage());
  }
}
