import { Component, EventEmitter, Output } from '@angular/core';
import { TemplateColors } from 'src/app/enums/template-colors';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  @Output() cerrarSideBar = new EventEmitter<string>();
  @Output() templateColor = new EventEmitter<string>();
  mostrarConfiguracion: boolean = false;
  color: string = "primary";

  ngOnInit() {
    this.getTemplateColor();
    this.getMostrarConfiguracion();
  }

  cerraSidebar() {
    this.cerrarSideBar.emit("closesidebar");
  }

  showConfig() {
    this.mostrarConfiguracion = true;
    localStorage.setItem("mostrarConfiguracion", String(this.mostrarConfiguracion));
  }

  showMenu() {
    this.mostrarConfiguracion = false;
    localStorage.setItem("mostrarConfiguracion", String(this.mostrarConfiguracion));
  }

  toggleConfig() {
    this.mostrarConfiguracion = !this.mostrarConfiguracion;
    localStorage.setItem("mostrarConfiguracion", String(this.mostrarConfiguracion));
  }

  changeTemplateColor(color: string) {
    this.color = color;
    this.templateColor.emit(color);
  }

  getTemplateColor() {
    let templateColor = localStorage.getItem("templateColor");
    if (templateColor) {
      const included = Object.values(TemplateColors).includes(templateColor);
      if (included)
        this.color = templateColor;
    }
  }

  getMostrarConfiguracion() {
    let mostrarConfiguracion = localStorage.getItem("mostrarConfiguracion");
    if (mostrarConfiguracion) {
      this.mostrarConfiguracion = mostrarConfiguracion.toLowerCase() === 'true';
    };
  }
}
