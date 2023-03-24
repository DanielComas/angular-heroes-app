import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    console.log(this.activateRoute.snapshot.paramMap.get('id'));
  }
}
