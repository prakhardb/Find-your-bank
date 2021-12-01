import { ADD_FAVORITE_BANK, REMOVE_FAVORITE_BANK, SAVE_BANKS_DATA } from "../actionTypes/bankActionType";

const initialState = {
  banks: [],
  favoriteBanks: []
};

const bankReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_BANKS_DATA:
      return { ...state, banks: action.data };
    case ADD_FAVORITE_BANK:
      return { ...state, favoriteBanks: action.data };
    case REMOVE_FAVORITE_BANK:
      return { ...state, favoriteBanks: action.data };
    default:
      return state;
  }
};

export default bankReducer;
