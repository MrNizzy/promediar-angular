import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-watermark',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './watermark.component.html',
  styleUrl: './watermark.component.scss',
})
export class WatermarkComponent {}
