require("babel-core/register");
require("babel-polyfill");

import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import './styles.scss';

function App() {
  return (
    <></>
  )
 }
App.propTypes = {

}
export default App
const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement)

