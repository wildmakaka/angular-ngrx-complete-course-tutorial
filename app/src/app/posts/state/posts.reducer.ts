import { createReducer } from '@ngrx/store';
import { initialState } from 'src/app/posts/state/posts.state';

const _postsReducer = createReducer(initialState);

export function postsReducer(state, action) {
  return _postsReducer(state, action);
}
