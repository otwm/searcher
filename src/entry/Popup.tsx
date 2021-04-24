import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Search from '../components/Search'

const Popup = () => {
  return (
    <>
      <div>searcher!!</div>
      <Search />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
