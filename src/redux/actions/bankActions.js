import { ADD_FAVORITE_BANK, FETCH_BANKS_DATA, REMOVE_FAVORITE_BANK, SAVE_BANKS_DATA } from "../actionTypes/bankActionType";

export function fetchBankData(data) {
  return { type: FETCH_BANKS_DATA, data };
}

export function saveBankData(data) {
  return { type: SAVE_BANKS_DATA, data };
}

export function addFavoriteBank(data) {
  return { type: ADD_FAVORITE_BANK, data };
}

export function removeFavoriteBank(data) {
  return { type: REMOVE_FAVORITE_BANK, data };
}