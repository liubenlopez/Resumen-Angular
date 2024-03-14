import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resolver',
  templateUrl: './resolver.component.html',
  styleUrls: ['./resolver.component.css']
})
export class ResolverComponent {
  departments!: String[];

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route)
    this.departments = this.route.snapshot.data['departments'];
  }
}
