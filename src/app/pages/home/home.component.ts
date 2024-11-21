import { Component } from '@angular/core';
import { FloatConfigComponent } from '@components/float-config/float-config.component';
import { FloatHelpComponent } from '@components/float-help/float-help.component';
import { PromediarComponent } from '@components/promediar/promediar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PromediarComponent, FloatHelpComponent, FloatConfigComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
