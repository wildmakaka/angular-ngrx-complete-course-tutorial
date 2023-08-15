import { createReducer, on } from '@ngrx/store';
import {
  customIncrement,
  decrement,
  increment,
  reset,
} from 'src/app/counter/counter/state/counter.actions';
import { initialState } from 'src/app/counter/counter/state/counter.state';

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0,
    };
  }),
  on(customIncrement, (state, action) => {
    return {
      ...state,
      counter: state.counter + action.count,
    };
  })
);

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}
