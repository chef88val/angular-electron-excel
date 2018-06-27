import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
    //throw new Error("Method not implemented.");
  }
  @Input() item = 0;
  constructor() { }

  ngOnInit() {
    console.log("CARD", this.item)
  }

}
