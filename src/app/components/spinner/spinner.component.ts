import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { SpinnerService } from 'src/app/servicios/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  @Output() spinnerClosed = new EventEmitter<boolean>();
  isLoading$ = this.spinnerService.isLoading$;
  spinnerVisible: boolean = true;
  constructor(private readonly spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.isLoading$.subscribe(resp => {
      this.spinnerVisible = resp;
      this.emitEvent(resp);
    })
  }

  emitEvent(condicion: boolean) {
    this.spinnerClosed.emit(!condicion);
  }
}
