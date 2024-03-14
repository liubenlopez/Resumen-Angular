import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(param => (this.courseName = param['nombreCurso']));
    if (!this.courseName)
      this.courseName = "Vacio";
  }
  courseName: string = "";
}
