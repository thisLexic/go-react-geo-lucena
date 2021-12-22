import { SET_ERROR } from "../actions/misc";

export function miscReducer(state, action) {
  switch (action.type) {
    case SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export const defaultStateMisc = {
  error: null,
};
