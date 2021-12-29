import {
  SET_ALL_AREAS,
  SET_VISIBLE_AREAS_IDS,
  SET_SHOW_AREA,
} from "../actions/area";

export function areaReducer(state, action) {
  switch (action.type) {
    case SET_ALL_AREAS: {
      return {
        ...state,
        areas: action.payload.areas,
        isAreasLoaded: action.payload.isAreasLoaded,
      };
    }
    case SET_VISIBLE_AREAS_IDS: {
      return {
        ...state,
        visibleAreasIDs: action.payload,
      };
    }
    case SET_SHOW_AREA: {
      return {
        ...state,
        areaDisplayIndex: action.payload.areaDisplayIndex,
        showArea: action.payload.showArea,
        areaCRUD: action.payload.areaCRUD,
      };
    }
    default: {
      return state;
    }
  }
}

export const defaultStateArea = {
  areas: [],
  visibleAreasIDs: {},
  isAreasLoaded: false,
  areaDisplayIndex: null,
  showArea: false,
  areaCRUD: "read",
};
