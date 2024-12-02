import {
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ImageType } from '../../models/image.interface';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { AverageService } from '@services/average.service';
import { Note } from '../../models/note.interface';
import { HtmlToImageService } from '@services/html-to-image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-download-image',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule],
  templateUrl: './download-image.component.html',
  styleUrl: './download-image.component.scss',
})
export class DownloadImageComponent {
  dialogRef = inject(MatDialog);
  isDialogOpen = signal<boolean>(false);
  averageService = inject(AverageService);
  toastr = inject(ToastrService);
  currentDialogRef: MatDialogRef<DownloadImageDialogComponent> | null = null;

  @HostListener('document:keydown.d', ['$event'])
  public toggleDialog() {
    if (this.averageService.notes().length === 0) {
      this.toastr.error(
        'Primero debes calcular el promedio de tus notas para poder descargar un fichero',
        '¡Ups!'
      );
      return;
    }
    if (this.isDialogOpen()) {
      this.currentDialogRef?.close();
    } else {
      this.isDialogOpen.set(true);
      this.currentDialogRef = this.dialogRef.open(
        DownloadImageDialogComponent,
        {
          autoFocus: false,
        }
      );
      this.currentDialogRef.afterClosed().subscribe(() => {
        this.isDialogOpen.set(false);
        this.currentDialogRef = null;
      });
    }
  }
}

@Component({
  selector: 'app-download-image-dialog',
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatTableModule,
  ],
  templateUrl: './download-image-dialog.component.html',
  styleUrl: './download-image-dialog.component.scss',
})
export class DownloadImageDialogComponent {
  averageService = inject(AverageService);
  htmlToImageService = inject(HtmlToImageService);
  imageType = signal<ImageType>(ImageType.SVG);
  displayedColumns = ['Nota', 'Porcentaje'];
  notes = signal<Note[]>([]);
  average = signal<number>(0);
  passingGrade = signal<number>(0);
  restPercentage = signal<number>(0);
  @ViewChild('content') content!: ElementRef;

  constructor() {
    this.notes.set(this.averageService.notes());
    this.average.set(this.averageService.calculateAverage());
    this.passingGrade.set(this.averageService.calculatePassingGrade());
    this.restPercentage.set(this.averageService.restPercentage());
  }

  changeImageType(type: string) {
    this.imageType.set(type as ImageType);
  }

  @HostListener('document:keydown.s', ['$event'])
  saveImage() {
    this.htmlToImageService.downloadImage(
      this.content.nativeElement,
      'promedio',
      this.imageType()
    );
  }
}
