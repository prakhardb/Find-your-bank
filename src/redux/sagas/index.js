import { all } from "redux-saga/effects";
import bank from './bank';
export default function* root() {
  yield all([
    bank()
  ]);
}
