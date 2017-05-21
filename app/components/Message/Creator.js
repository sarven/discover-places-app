import React, { Component } from 'react';
import { View, Picker, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { createMessage, HTTP_CREATED } from './../../config/api';
import update from 'immutability-helper';
import PhotoPicker from './../Utils/PhotoPicker';
import VideoPicker from './../Utils/VideoPicker';
import { COLORS, STYLES } from './../../config/style';

const AVAILABLE_SCOPES  = [1,2,5];

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

  handlePick (target, source) {
    const message = update(this.state.message, {[target]: {
      $set: source
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
    this.props.navigation.setParams({isLoading: true});
    navigator.geolocation.getCurrentPosition(position => {
      let message = this.state.message;
      message.latitude = position.coords.latitude;
      message.longitude = position.coords.longitude;

      createMessage(message)
        .then(response =>  {
          if (response.status === HTTP_CREATED) {
            this.props.navigation.setParams({isLoading: false});
            this.props.navigation.navigate('MessageList', {isLoading: false});
          }
        });
    });
  }

  validate () {
    const { content, photo, video } = this.state.message;
    const dataExist = !!(content || photo || video);
    const scopeValid = AVAILABLE_SCOPES.includes(this.state.message.scope);
    const valid = dataExist && scopeValid;

    this.setState({valid: valid});
  }

  render () {
    return (
      <View>
        {!this.state.valid &&
          <Text
            style={STYLES.error}
          >
            You have to add content, photo or video
          </Text>
        }
        <FormLabel>Content</FormLabel>
        <FormInput
          onChangeText={(content) => this.updateField('content', content)}
          value={this.state.message.content}
        />
        <PhotoPicker
          onPick={this.handlePick.bind(this)}
        />
        <VideoPicker
          onPick={this.handlePick.bind(this)}
        />
        <Picker
          selectedValue={this.state.message.scope.toString()}
          onValueChange={(scope) => this.updateField('scope', parseInt(scope))}
          style={STYLES.picker}
        >
          <Picker.Item label="1km" value="1" />
          <Picker.Item label="2km" value="2" />
          <Picker.Item label="5km" value="5" />
        </Picker>
        <Button
          buttonStyle={STYLES.submit}
          title="Add"
          icon={{name: 'plus', type: 'font-awesome'}}
          backgroundColor={COLORS.blue}
          large={true}
          onPress={this.submit.bind(this)}
        />
      </View>
    );
  }
}
