import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import { fetchBankData } from '../../redux/actions/bankActions';
import { Spin, Table } from 'antd';
import 'antd/dist/antd.css';
import './style.scss';
import _ from 'lodash';

export default function AllBanks(props) {
  const [pageSize, setPageSize] = useState(10),
    bankReducer = useSelector((state) => state.bankReducer),
    [banksData, setBanksData] = useState([]),
    [city, setCity] = useState(""),
    [category, setCategory] = useState(""),
    [searchKeyword, setSearchKeyword] = useState(""),
    [loader, setLoader] = useState(false),
    isFavoritePage = props.location.pathname === "/favorites" ? true : false,
    delayedCallback = _.debounce((q) => filterData(q), 1000),
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
    history = useHistory();


  useEffect(() => {
    if (bankReducer?.banks?.length && !isFavoritePage)
      setBanksData(bankReducer.banks);
  }, [bankReducer.banks])

  useEffect(() => {
    let dataToSend = {
      query: "banks?city=MUMBAI",
      callback: function () {
        setLoader(false);
      }
    };
    if (!isFavoritePage) {
      setLoader(true);
      dispatch(fetchBankData(dataToSend));
    }
    else {
      let data = [];
      if (!!Object.keys(bankReducer.favoriteBanks)?.length) {
        Object.keys(bankReducer.favoriteBanks).forEach((bank) => {
          data.push(bankReducer.favoriteBanks[bank]);
        });
      }
      setBanksData(data);
    }
  }, [props.location.pathname])

  function onPageSizeChange(current, pageSize) {
    setPageSize(pageSize);
  }

  function viewBankDetails(bank = {}) {
    history.push(`/bank-details/${bank.ifsc}`, { bank });
  }

  function setCityParam(val = "") {
    setCity(val);
    setCategory("");
    setSearchKeyword("");
    let dataToSend = {
      query: `banks?city=${val}`,
      callback: function () {
        setLoader(false);
      }
    };
    if (!isFavoritePage) {
      setLoader(true);
      dispatch(fetchBankData(dataToSend));
    }
  }

  function setCategoryParam(val = "") {
    setCategory(val);
  }

  function filterData(q) {
    let cat = category ? category : "ifsc", data = [];
    if (!!bankReducer.banks?.length) {
      data = bankReducer.banks.filter((bank) =>
        bank[cat].toLowerCase().includes(q.toLowerCase())
      );
      setBanksData(data);
    }
  }

  function searchBankData(keyword = "") {
    setSearchKeyword(keyword);
    delayedCallback(keyword);
  }

  return (
    <Spin spinning={loader} delay={500}>
      <div className="all-banks-container">
        <SideBar {...props} />
        <div className="bank-data-container">
          <div className="header-container">
            <div className="header-text">
              {isFavoritePage ? "Favorite Banks" : "All Banks"}
            </div>
            {!isFavoritePage &&
              <div className="filters-wrapper">
                <div className="city-filter">
                  <select name="cities" id="cities" onChange={(e) => setCityParam(e.target.value)}>
                    <option value="">Select city</option>
                    <option value="MUMBAI">Mumbai</option>
                    <option value="DELHI">Delhi</option>
                    <option value="BENGALURU">Bengaluru</option>
                    <option value="KOLKATA">Kolkata</option>
                    <option value="CHENNAI">Chennai</option>
                  </select>
                </div>
                <div className="category-filter">
                  <select name="category" id="category" onChange={(e) => setCategoryParam(e.target.value)}>
                    <option value="">Select category</option>
                    <option value="ifsc">IFSC</option>
                    <option value="branch">Branch</option>
                    <option value="bank_name">Bank Name</option>
                  </select>
                </div>
                <div className="search-container">
                  <input type="text" placeholder="Search" value={searchKeyword} onChange={(e) => searchBankData(e.target.value)} />
                </div>
              </div>
            }
          </div>
          <div className="banks-table-container">
            <Table columns={columns} onSelect={viewBankDetails}
              rowKey="ifsc"
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => { viewBankDetails(record) }
                }
              }}
              className="bank-data-table"
              dataSource={banksData}
              pagination={{ pageSize, onShowSizeChange: onPageSizeChange }}
              scroll={{ y: 650 }} />
          </div>
        </div>
      </div>
    </Spin>
  )
}