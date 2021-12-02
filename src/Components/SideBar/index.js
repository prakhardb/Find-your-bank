import React from 'react';
import history from '../../history';

import './style.scss';

export default function SideBar(props) {
  function gotoPage(page = "") {
    history.push(page);
  }
  return (
    <div className="side-bar-container">
      <div className={`all-banks-wrapper ${props.location.pathname !== "/favorites" ? "active" : ""}`} onClick={() => gotoPage("/")}>
        All Banks
      </div>
      <div className={`favorites-wrapper ${props.location.pathname === "/favorites" ? "active" : ""} `} onClick={() => gotoPage("/favorites")}>
        Favorites
      </div>
    </div>
  )
}