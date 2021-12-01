import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import { fetchBankData } from '../../redux/actions/bankActions';
import history from '../../history';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import './style.scss';

export default function AllBanks() {
  const [pageSize, setPageSize] = useState(10),
    bankReducer = useSelector((state) => state.bankReducer),
    dispatch = useDispatch(),
    columns = [
      {
        title: 'Bank',
        dataIndex: 'bank_name',
        width: 250,
      },
      {
        title: 'IFSC',
        dataIndex: 'ifsc',
        width: 150,
      },
      {
        title: 'Bank ID',
        dataIndex: 'bank_id',
        width: 150
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
    ],
    history = useNavigate();
  useEffect(() => {
    let dataToSend = {
      query: "banks?city=MUMBAI",
    };
    dispatch(fetchBankData(dataToSend));
  }, []);

  function onPageSizeChange(current, pageSize) {
    console.log("page change", pageSize);
    setPageSize(pageSize);
  }

  function viewBankDetails(bank = {}) {
    console.log("row select-------------->", bank);
    history(`/bank-details/${bank.ifsc}`, { state: bank, replace: true });
  }

  return (
    <div className="all-banks-container">
      <SideBar />
      <div className="bank-data-container">
        <div className="header-container">
          <div className="header-text">
            All Banks
          </div>
          <div className="filters-wrapper">
            <div className="city-filter">
              <select name="cities" id="cities">
                <option value="">Select city</option>
                <option value="MUMBAI">Mumbai</option>
                <option value="DELHI">Delhi</option>
                <option value="BENGALURU">Bengaluru</option>
                <option value="KOLKATA">Kolkata</option>
                <option value="CHENNAI">Chennai</option>
              </select>
            </div>
            <div className="category-filter">
              <select name="category" id="category">
                <option value="">Select category</option>
                <option value="IFSC">IFSC</option>
                <option value="branch">Branch</option>
                <option value="bank_name">Branch Name</option>
              </select>
            </div>
            <div className="search-container">
              <input type="text" placeholder="Search" />
            </div>
          </div>
        </div>
        <div className="banks-table-container">
          <Table columns={columns} onSelect={viewBankDetails}
            rowKey="ifsc"
            onRow={(record, rowIndex) => {
              return {
                onClick: () => { viewBankDetails(record) }
              }
            }}
            dataSource={bankReducer?.banks}
            pagination={{ pageSize, onShowSizeChange: onPageSizeChange }}
            scroll={{ y: 650 }} />
        </div>
      </div>
    </div>
  )
}