import { Component } from '@angular/core';
import { DynamicTemplate, RuntimeCompilerService } from './runtime-compiler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  template = `<input [(ngModel)]="name"> <span>{{name}}</span>
<br>
<button (click)="i = i+1">Click {{i}}</button>`;
  dynamicTemplate: DynamicTemplate;

  constructor(private runtimeCompilerService: RuntimeCompilerService) {
  }

  renderDynamicComponent(): void {
    this.runtimeCompilerService.createAndCompileTemplate(this.template)
      .then(data => {
        this.dynamicTemplate = data;
      })
      .catch(error => {
        this.dynamicTemplate = null;
        console.error(error);
      });

  }
}
