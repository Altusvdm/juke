import Immutable, { Map } from 'immutable';

const ACTIONS = {
  UPDATE_DATA: 'UPDATE_DATA'
};

export function updateData(data) {
  return {
    type: ACTIONS.UPDATE_DATA,
    data: data
  };
}

const initialState = Map({});

export default function firebase(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_DATA:
      return Immutable.fromJS(action.data);
    default:
      return state;
  }
}