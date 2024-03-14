import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { permisosGuard } from 'src/app/guards/permisos.guard';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.css']
})
export class RoutingComponent {
  cursoActivo: boolean = false;
  parametroParaQueryparams1: string = "1";
  parametroParaQueryparams2: string = "2";
  tienePermiso: boolean = false;
  notificacion: boolean = false;

  constructor(private router: Router, private permisosGuard: permisosGuard) { }

  ngOnInit() {
    const currentUrl = window.location.href;
    if (currentUrl.indexOf("curso") > 0) {
      this.cursoActivo = true;
    }
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event["url"]?.indexOf("curso") > 0) {
          this.cursoActivo = true;
        } else {
          this.cursoActivo = false;
        }
      }
    });
    this.tienePermiso = this.permisosGuard.tienePermiso();
  }

  toggleAccess() {
    this.tienePermiso = !this.tienePermiso;
    this.permisosGuard.assignarPermisos(this.tienePermiso);
    this.notificacion = false;
  }

  activarNotificacion() {
    this.notificacion = true;
  }

}
