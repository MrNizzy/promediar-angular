import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AverageService {
  public average = signal<number>(0);
  public percentage = signal<number>(0);
  public passingGrade = signal<number>(0);

  public calculateAverage(notes: { note: number; percentage: number }[]): void {
    const sum = notes.reduce(
      (acc: number, note: { note: number; percentage: number }) =>
        acc + note.note * (note.percentage / 100),
      0
    );

    this.average.set(sum);
  }

  public calculatePassingGrade(average: number, percentage: number): void {
    this.percentage.set(percentage);
    let passingGrade = (3 - average) / (percentage / 100);
    passingGrade = parseFloat(passingGrade.toFixed(2));

    this.passingGrade.set(passingGrade);
  }
}
