import {
  SET_ALL_AREAS,
  SET_IS_AREAS_LOADED,
  SET_SHOW_AREA,
} from "../actions/area";

export function areaReducer(state, action) {
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
    default: {
      return state;
    }
  }
}

export const defaultStateArea = {
  areas: [],
  isAreasLoaded: false,
  areaDisplayIndex: null,
  showArea: false,
};
