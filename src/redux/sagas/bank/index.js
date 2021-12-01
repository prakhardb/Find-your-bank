import { put, takeEvery } from "redux-saga/effects";
import apiCall from "../../../services/api";
import { saveBankData } from "../../actions/bankActions";
import { FETCH_BANKS_DATA } from "../../actionTypes/bankActionType";

function* fetchBankData(actions) { //fetching order details from leaf order hash
  try {
    const bankData = yield apiCall({
      method: "GET",
      url: actions.data.query,
    });
    if (bankData && bankData.status && bankData?.data?.length) {
      yield put(saveBankData(bankData.data));
    } else {
      yield put(saveBankData([]));
    }
  } catch (err) {
    console.log(err);
  }
}


export default function* root() {
  yield takeEvery(FETCH_BANKS_DATA, fetchBankData);
}
