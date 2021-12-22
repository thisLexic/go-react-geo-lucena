import {
  SET_ALL_RISKS,
  SET_IS_RISKS_LOADED,
  SET_SHOW_RISK,
} from "../actions/risk";

export function riskReducer(state, action) {
  switch (action.type) {
    case SET_ALL_RISKS: {
      return {
        ...state,
        risks: action.payload,
      };
    }
    case SET_IS_RISKS_LOADED: {
      return {
        ...state,
        isRisksLoaded: action.payload,
      };
    }
    case SET_SHOW_RISK: {
      return {
        ...state,
        riskDisplayIndex: action.payload.riskDisplayIndex,
        showRisk: action.payload.showRisk,
      };
    }
    default: {
      return state;
    }
  }
}

export const defaultStateRisk = {
  risks: [],
  isRisksLoaded: false,
  riskDisplayIndex: null,
  showRisk: false,
};
