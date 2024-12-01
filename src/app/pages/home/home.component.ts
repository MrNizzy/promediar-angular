import { Component } from '@angular/core';
import { FloatConfigComponent } from '@components/float-config/float-config.component';
import { FloatHelpComponent } from '@components/float-help/float-help.component';
import { PromediarComponent } from '@components/promediar/promediar.component';
import { WatermarkComponent } from '../../components/watermark/watermark.component';

@Component({
  selector: 'app-home',
  imports: [
    PromediarComponent,
    FloatHelpComponent,
    FloatConfigComponent,
    WatermarkComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
