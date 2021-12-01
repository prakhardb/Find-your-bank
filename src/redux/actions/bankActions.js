import { FETCH_BANKS_DATA, SAVE_BANKS_DATA } from "../actionTypes/bankActionType";

export function fetchBankData(data) {
  console.log("check here call hua------------>", data);
  return { type: FETCH_BANKS_DATA, data };
};

export function saveBankData(data) {
  return { type: SAVE_BANKS_DATA, data };
};