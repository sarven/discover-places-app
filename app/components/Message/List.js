import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { getMessages, getMessageUploadUrl } from './../../config/api';
import { Card } from 'react-native-elements';
import ReactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

const REFRESH_TIME = 15000;

export default class List extends Component {
  constructor () {
    super();

    this.state = {
      messages: [],
      position: {
        lat: 0,
        long: 0
      }
    };
  }

  getImage(message) {
    if (message.photo) {
      return { uri: getMessageUploadUrl(message.photo) };
    } else if (message.video) {
      return require('./../../img/video-placeholder.jpg');
    }

    return null;
  }

  componentDidMount () {
    this.getPosition();

    this.setInterval(() => {
      this.getPosition();
    }, REFRESH_TIME);
  }

  getPosition () {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        position: {
          lat: position.coords.latitude,
          long: position.coords.longitude
        }
      });
      this.fetchMessages();
    }, error => {
      console.log(error.message);
    }, {
      enableHighAccuracy: true,
      timeout: 20000
    });
  }

  fetchMessages () {
    getMessages(this.state.position.lat, this.state.position.long)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          messages: responseJson.data
        });
      })
      .catch(e => {
        console.error(e);
      });
  }

  render () {
    return (
      <ScrollView>
      {
        this.state.messages.map(m => {
          const message = m[0];

          return (
            <Card
              image={this.getImage(message)}>
              <Text style={{marginBottom: 10}}>
                {message.content}
              </Text>
            </Card>
          );
        })
      }
      </ScrollView>
    );
  }
}

ReactMixin.onClass(List, TimerMixin);
