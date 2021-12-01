import React, { Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import './style.scss';

export default function BankDetails(props) {
  const location = useLocation(),
    bankDetails = location.state;
  return (
    <div className="bank-detail-container">
      <div className="bank-details-wrapper">
        <StarFilled className="favorite-icon" style={{ color: "#F5CC27" }} />
        <StarOutlined className="favorite-icon" />
        <div className="bank-name">
          <span className="heading">
            Bank Name:
          </span>
          <span className="details">
            {bankDetails.bank_name}
          </span>
        </div>
        <div className="ifsc">
          <span className="heading">
            IFSC Code:
          </span>
          <span className="details">
            {bankDetails.ifsc}
          </span>
        </div>
        <div className="branch">
          <span className="heading">
            Branch Name:
          </span>
          <span className="details">
            {bankDetails.branch}
          </span>
        </div>
        <div className="address">
          <span className="heading">
            Address:
          </span>
          <span className="details">
            {bankDetails.address}
          </span>
        </div>
        <div className="city">
          <span className="heading">
            City:
          </span>
          <span className="details">
            {bankDetails.city}
          </span>
        </div>
        <div className="district">
          <span className="heading">
            District:
          </span>
          <span className="details">
            {bankDetails.district}
          </span>
        </div>
        <div className="state">
          <span className="heading">
            State:
          </span>
          <span className="details">
            {bankDetails.state}
          </span>
        </div>
      </div>
    </div>
  )
}