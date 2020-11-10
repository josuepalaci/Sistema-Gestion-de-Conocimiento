import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistema-Gestion-de-Conocimiento';
  
  public whiteThem: string = `../assets/white.css`;
  public darkThem: string = `../assets/dark.css`;
  cssUrl: string ;
  constructor(public sanitizer: DomSanitizer) {
    this.cssUrl = (localStorage.getItem('estilo')) ? localStorage.getItem('estilo'): this.whiteThem ;
  }

  cambio(cambio: Boolean){
    this.cssUrl = (this.cssUrl === `../assets/dark.css`) ? `../assets/white.css` : `../assets/dark.css`;
    localStorage.setItem('estilo',this.cssUrl);
  }

}
