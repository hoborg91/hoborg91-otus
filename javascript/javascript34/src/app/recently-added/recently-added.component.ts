import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {
  @Input() words: any[];// = [ 'pain', 'despair', 'humiliation' ];

  constructor() { }

  ngOnInit(): void {
  }

}
