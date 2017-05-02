import React, { Component } from 'react';
import { Text } from 'react-native';
import moment from 'moment';

export default class Date extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      date: moment(props.date).format('DD/MM/YYYY HH:mm')
    };
  }

  render () {
    return (
      <Text style={{fontStyle: 'italic'}}>{this.state.date}</Text>
    );
  }
}
