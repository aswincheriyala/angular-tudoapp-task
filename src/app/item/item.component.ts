import { Component, OnInit ,Input ,Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() post:any[]
  @Input() i;
  @Input() flag;

  @Output() changeName= new EventEmitter();
  @Output() changeTog= new EventEmitter();



  constructor() { }

  ngOnInit() {
  }
  nameChange(){
    this.changeName.emit();
  }
  togChange(){
    this.changeTog.emit();
  }

}
