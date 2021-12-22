import {
  SET_ALL_AREAS,
  SET_IS_AREAS_LOADED,
  SET_SHOW_AREA,
  SET_ALL_RISKS,
  SET_IS_RISKS_LOADED,
  SET_SHOW_RISK,
  SET_ERROR,
} from "./actions";

export function appReducer(state, action) {
  switch (action.type) {
    case SET_ALL_AREAS: {
      return {
        ...state,
        areas: action.payload,
      };
    }
    case SET_IS_AREAS_LOADED: {
      return {
        ...state,
        isAreasLoaded: action.payload,
      };
    }
    case SET_SHOW_AREA: {
      return {
        ...state,
        areaDisplayIndex: action.payload.areaDisplayIndex,
        showArea: action.payload.showArea,
      };
    }
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

export const defaultState = {
  areas: [],
  isAreasLoaded: false,
  areaDisplayIndex: null,
  showArea: false,

  risks: [],
  isRisksLoaded: false,
  riskDisplayIndex: null,
  showRisk: false,

  error: null,
};
