import React from 'react';
import Routes from '../Routes';
import Navbar from './Navbar'

class Main extends React.Component {
  render() {
    return (
      <div className="main-container">
        <Navbar />
        <Routes />
      </div>
    )
  }
}

export default Main;
