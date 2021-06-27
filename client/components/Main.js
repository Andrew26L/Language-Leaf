import React from 'react';
import Routes from '../Routes';
import Navbar from './Navbar'

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="outerContainer">
        <Routes />
      </div>
    </div>
  )
}

export default Main;
