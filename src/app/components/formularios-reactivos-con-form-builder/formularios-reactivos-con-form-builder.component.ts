import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formularios-reactivos-con-form-builder',
  templateUrl: './formularios-reactivos-con-form-builder.component.html',
  styleUrls: ['./formularios-reactivos-con-form-builder.component.css']
})
export class FormulariosReactivosConFormBuilderComponent {
  constructor(private fb: FormBuilder) {
  }

  get getName() {
    return this.formUser.get('name') as FormControl;
  }
  get getEmail() {
    return this.formUser.get('email') as FormControl;
  }

  formUser = this.fb.group({
    'name': ['', Validators.required],
    'email': ['', [Validators.required, Validators.email]],
  })

  enviarFormulario() {
    console.log(this.formUser.value);
    alert(JSON.stringify(this.formUser.value));
  }
}
