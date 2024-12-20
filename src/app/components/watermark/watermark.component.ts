import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-watermark',
  standalone: true,
  imports: [MatTooltipModule, MatExpansionModule],
  templateUrl: './watermark.component.html',
  styleUrl: './watermark.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatermarkComponent {}
