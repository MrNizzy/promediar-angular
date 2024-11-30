import { Injectable, signal } from '@angular/core';
import { Note } from '../models/note.interface';

@Injectable({
  providedIn: 'root',
})
export class AverageService {
  public maxPercentage = signal<number>(100);
  public minPassingGrade = signal<number>(3.0);
  public maxPassingGrade = signal<number>(5.0);
  public minValidNote = signal<number>(0.0);
  public restPercentage = signal<number>(0);
  public notes = signal<Note[]>([]);

  public calculateAverage(): number {
    const sum = this.notes().reduce(
      (acc: number, note: Note) => acc + note.note * (note.percentage / 100),
      0
    );
    return parseFloat(sum.toFixed(2));
  }

  public getPercentageAccumulated(): number {
    const percentageAccumulated = this.notes().reduce(
      (acc: number, note: Note) => acc + note.percentage,
      0
    );
    return percentageAccumulated;
  }

  public calculatePassingGrade(): number {
    const average = this.calculateAverage();
    const percentageAccumulated = this.getPercentageAccumulated();
    this.restPercentage.set(
      (this.maxPercentage() - percentageAccumulated) / 100
    );
    const passingGrade =
      (this.minPassingGrade() - average) / this.restPercentage();
    return parseFloat(passingGrade.toFixed(2));
  }
}
