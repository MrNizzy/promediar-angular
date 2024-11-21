import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-float-config',
    imports: [MatIconModule, MatButtonModule, MatTooltipModule],
    templateUrl: './float-config.component.html',
    styleUrl: './float-config.component.scss'
})
export class FloatConfigComponent {}
