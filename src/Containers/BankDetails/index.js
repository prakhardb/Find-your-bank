import React from 'react';
import { StarOutlined, StarFilled, ArrowLeftOutlined } from '@ant-design/icons';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteBank, removeFavoriteBank } from '../../redux/actions/bankActions';
import { useHistory } from 'react-router-dom';

export default function BankDetails(props) {
  const bankReducer = useSelector((state) => state.bankReducer),
    favoriteBanks = bankReducer.favoriteBanks,
    bankDetail = props.location?.state?.bank,
    history = useHistory(),
    dispatch = useDispatch();

  function addFavBank(favBanks = {}, bank = {}) {
    let data = { ...favBanks };
    data[bank.ifsc] = { ...bank };
    dispatch(addFavoriteBank(data));
  }

  function removeFavBank(favBanks = {}, bank = {}) {
    let data = { ...favBanks };
    delete data[bank.ifsc];
    dispatch(removeFavoriteBank(data));
  }

  function gotoBack() {
    history.goBack();
  }

  return (
    <div className="bank-detail-container">
      <div className="header-container">
        <div className="header" onClick={gotoBack}>
          <ArrowLeftOutlined style={{ fontSize: '32px' }} />
          <span className="back-text">Back</span>
        </div>
      </div>
      <div className="bank-details-wrapper">
        {favoriteBanks?.[bankDetail?.ifsc] ?
          <StarFilled className="favorite-icon" style={{ fontSize: "14px", color: "#F5CC27" }} onClick={() => removeFavBank(favoriteBanks, bankDetail)} />
          :
          <StarOutlined className="favorite-icon" style={{ fontSize: "14px" }} onClick={() => addFavBank(favoriteBanks, bankDetail)} />
        }
        <div className="detail-container">
          <div className="bank-name">
            <span className="details">
              {bankDetail?.bank_name}
            </span>
          </div>
          <div className="ifsc">
            <span className="heading">
              IFSC Code:
            </span>
            <span className="details">
              {bankDetail?.ifsc}
            </span>
          </div>
          <div className="branch">
            <span className="heading">
              Branch Name:
            </span>
            <span className="details">
              {bankDetail?.branch}
            </span>
          </div>
          <div className="address">
            <span className="heading">
              Address:
            </span>
            <span className="details">
              {bankDetail?.address}
            </span>
          </div>
          <div className="city">
            <span className="heading">
              City:
            </span>
            <span className="details">
              {bankDetail?.city}
            </span>
          </div>
          <div className="district">
            <span className="heading">
              District:
            </span>
            <span className="details">
              {bankDetail?.district}
            </span>
          </div>
          <div className="state">
            <span className="heading">
              State:
            </span>
            <span className="details">
              {bankDetail?.state}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}