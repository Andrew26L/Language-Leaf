import React from 'react';
import {connect} from 'react-redux';
import {authenticate} from '../store';

const LogIn = (props) => {
  const {name, displayName, handleSubmit, error} = props;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        
      </form>
    </div>
  )
}
