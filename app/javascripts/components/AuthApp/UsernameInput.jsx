"use strict";

import React from "react"
import BaseInput from "lib/BaseInput"

function isValidUsername(username) {
  let validUsernameReg = /^[a-zA-Z0-9]+([_\s\-]?[a-zA-Z0-9])*$/;

  if (validUsernameReg.test(username)) {
    return true;
  }
  
  return false;
}


export default class UsernameInput extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isValid: false,
      value: ""
    };
  }
  
  handleUsernameChange = (newValue) => {
    let isValid = isValidUsername(newValue);

    this.setState({
      isValid: isValid,
      value: newValue
    });
    
    this.props.handleChange(isValid ? newValue : "");
  };
  
  validateUsername() {
    if (!this.state.isValid) {
      if (this.state.value === "") {
        return null;
      }
      
      return "error";
    }
    
    return "success";
  }
  
  render() {
    
    let focusText = do {
      if (this.props.isRegister) {
        "Username does not have to be unique, first character must be a letter or a number, single '_', '-' and space maybe used in the middle, followed by letters and numbers"
      } else {
        ""
      }
    }
    
    let validationState = do {
      if (this.props.isRegister) {
        this.validateUsername()
      } else {
        null
      }
    }
    
    return (
      <BaseInput
        {...this.props}
        type="text"
        placeholder="Enter username"
        label="Username"
        icon="user"
        focusText={focusText}
        validationState={validationState}
        autoComplete="off"
        handleChange={this.handleUsernameChange} />
    );
  }
};

UsernameInput.propTypes = {
  handleChange: React.PropTypes.func.isRequired,
  isRegister: React.PropTypes.bool
};

UsernameInput.defaultProps = {
  isRegister: false
};