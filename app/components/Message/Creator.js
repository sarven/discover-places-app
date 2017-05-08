import React, { Component } from 'react';
import { View, Picker, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { createMessage } from './../../config/api';
import update from 'immutability-helper';

const AVAILABLE_SCOPES  = [1,2,5];
const HTTP_CREATED = 201;

export default class Creator extends Component
{
  constructor (props) {
    super(props);

    this.state = {
      valid: false,
      message: {
        content: null,
        photo: null,
        video: null,
        latitude: 0,
        longitude: 0,
        scope: 1
      }
    };
  }

  updateField (property, value) {
    if (!this.state.message.hasOwnProperty(property)) {
      return;
    }

    const message = update(this.state.message, {[property]: {
      $set: value
    }});

    this.setState({
      message: message
    });
    this.validate();
  }

  submit () {
    this.validate();
    if (!this.state.valid) {
      return false;
    }

    navigator.geolocation.getCurrentPosition(position => {
      let message = this.state.message;
      message.latitude = position.coords.latitude;
      message.longitude = position.coords.longitude;

      createMessage(message)
        .then(response =>  {
          if (response.status === HTTP_CREATED) {
            this.props.navigation.navigate('MessageList');
          }
        });
    });
  }

  validate () {
    if (
      (
        (this.state.message.content && this.state.message.content !== '')
        || this.state.message.photo
        || this.state.message.video
      )
      && AVAILABLE_SCOPES.includes(this.state.message.scope)
    ) {
      this.setState({valid: true});
    } else {
      this.setState({valid: false});
    }
  }

  render () {
    return (
      <View>
        {!this.state.valid &&
          <Text
            style={{
              color: 'red',
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'center'
            }}
          >
              You have to add content, photo or video
            </Text>
        }
        <FormLabel>Content</FormLabel>
        <FormInput
          onChangeText={(content) => this.updateField('content', content)}
          value={this.state.message.content}
        />
        <Picker
          selectedValue={this.state.message.scope}
          onValueChange={(scope) => this.updateField('scope', scope)}
        >
          <Picker.Item label="1km" value="1" />
          <Picker.Item label="2km" value="2" />
          <Picker.Item label="5km" value="5" />
        </Picker>
        <Button
          buttonStyle={{marginTop: 10, marginBottom: 10}}
          title="Add"
          icon={{name: 'plus', type: 'font-awesome'}}
          backgroundColor="green"
          large={true}
          onPress={this.submit.bind(this)}
        />
      </View>
    );
  }
}
