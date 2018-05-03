import React, { Component } from 'react';
// import { Form, Input, Icon, Button, Row, Col } from 'antd';
import { Input } from 'antd';
// import axios from 'axios';

class CountriesForm extends Component {
  state = {
    data: {}
  };

  componentDidMount() {
    console.log('componentDidMount' );
    this.setState({data: 'Srbija'})
  }

  render () {
      return (
        <Input/>
      )
  }
}

export default CountriesForm;
