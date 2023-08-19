import { createReducer, on } from '@ngrx/store';
import { loginSuccess, signupSuccess } from 'src/app/auth/state/auth.actions';
import { initialState } from 'src/app/auth/state/auth.state';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(signupSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  })
);

export function AuthReducer(state, action) {
  return _authReducer(state, action);
}
