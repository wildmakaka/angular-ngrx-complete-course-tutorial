import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  decrement,
  increment,
  reset,
} from 'src/app/counter/counter/state/counter.actions';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.css'],
})
export class CounterButtonsComponent {
  constructor(private store: Store<{ counter: { counter: number } }>) {}

  onIncrement() {
    this.store.dispatch(increment());
  }

  onDecrement() {
    this.store.dispatch(decrement());
  }

  onReset() {
    this.store.dispatch(reset());
  }
}
