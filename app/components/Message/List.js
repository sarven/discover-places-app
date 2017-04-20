import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { getMessages, getMessageUploadUrl } from './../../config/api';
import { Card, ListItem } from 'react-native-elements';


export default class List extends Component {
  state = {
    messages: []
  };

  getImage(message) {
    if (message.photo) {
      return { uri: getMessageUploadUrl(message.photo) }
    }
    if (message.video) {
      return require('./../../img/video-placeholder.jpg')
    }

    return null;
  }

  componentDidMount () {
    getMessages(50.0000002, 50.0000002)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.data);

        this.setState({
          messages: responseJson.data
        })
      })
      .catch(e => {
        console.error(e);
      });
  }

  render () {
    return (
      <ScrollView>
      {
        this.state.messages.map((m, i) => {
          const message = m[0];

          return (
            <Card
              image={this.getImage(message)}>
              <Text style={{marginBottom: 10}}>
                {message.content}
              </Text>
            </Card>
          )
        })
      }
      </ScrollView>
    );
  }
}
