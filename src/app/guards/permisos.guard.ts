// import { CanActivateFn } from '@angular/router';
// export const permisosGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class permisosGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tienePermiso()) {
      return true;
    }
    alert('No tiene permiso para acceder a esta url. Debe dar click en el botón "Activar permisos de acceso a ruta restringida".')
    return false;
  }

  private permiso: boolean = false;
  tienePermiso(): boolean {
    return this.permiso;
  }

  assignarPermisos(value: boolean) {
    this.permiso = value;
  }
};
