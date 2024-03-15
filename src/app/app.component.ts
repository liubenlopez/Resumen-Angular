import { Component } from '@angular/core';
import { TemplateColors } from './enums/template-colors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'resumen-angular-app';
  sidebar: boolean = false;
  templateColor: string = "primary";

  ngOnInit() {
  }

  ngAfterViewChecked() {
    //Cuando se agrega un setTimeout aqui se genera una secuencia infinita de llamadas al ngAfterViewChecked (no usarlo aqui)
    this.getSideBarStatus();
    this.getTemplateColor();
    setTimeout(() => { document.querySelector(".appspinner")?.remove(); }, 2000);
  }

  getSideBarStatus() {
    let sidebar = localStorage.getItem("sidebar");
    if (sidebar) {
      this.sidebar = sidebar.toLowerCase() === 'true';
      if (this.sidebar === true) {
        this.sidebarshow();
      };
    };
  }

  getTemplateColor() {
    let templateColor = localStorage.getItem("templateColor");
    if (templateColor) {
      const included = Object.values(TemplateColors).includes(templateColor);
      if (included)
        this.templateColor = templateColor;
    }
  }

  sidebartoggle() {
    this.sidebar = !this.sidebar;
    localStorage.setItem("sidebar", String(this.sidebar));
    document.querySelector('.appsidebartoggle')?.classList.toggle("show");
    document.querySelector('.appsidebar')?.classList.toggle("hide");
    document.querySelector('.appcontainer')?.classList.toggle("full");
  }

  sidebarshow() {
    document.querySelector('.appsidebartoggle')?.classList.add("show");
    document.querySelector('.appsidebar')?.classList.remove("hide");
    document.querySelector('.appcontainer')?.classList.remove("full");
  }

  changeTemplateColor(color: string) {
    this.templateColor = color;
    localStorage.setItem("templateColor", color);
  }

}
