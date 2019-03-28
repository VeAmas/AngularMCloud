import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, distinctUntilChanged, debounceTime, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {
    
    const searchBox = document.getElementById('search-box');
    
    fromEvent(searchBox, 'input').pipe(
      map((e) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(v => console.log(v))
  }

    

}
