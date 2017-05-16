import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createComment, HTTP_CREATED } from './../../config/api';
import update from 'immutability-helper';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import PhotoPicker from './../Utils/PhotoPicker';
import VideoPicker from './../Utils/VideoPicker';

export default class Creator extends Component
{
  constructor (props) {
    super(props);

    this.state = {
      messageId: props.messageId,
      comment: {
        content: null,
        photo: null,
        video: null
      }
    };
  }

  updateField (property, value) {
    if (!this.state.comment.hasOwnProperty(property)) {
      return;
    }

    const comment = update(this.state.comment, {[property]: {
      $set: value
    }});

    this.setState({
      comment: comment
    });
    this.validate();
  }

  handlePick (target, source) {
    const comment = update(this.state.comment, {[target]: {
      $set: source
    }});

    this.setState({
      comment: comment
    });
    this.validate();
  }

  validate () {
    if (
      (this.state.comment.content && this.state.comment.content !== '')
      || this.state.comment.photo
      || this.state.comment.video
    ) {
      this.setState({valid: true});
    } else {
      this.setState({valid: false});
    }
  }

  submit () {
    this.validate();
    if (!this.state.valid) {
      return false;
    }

    createComment(this.state.messageId, this.state.comment)
      .then(response =>  {
        if (response.status === HTTP_CREATED) {
          this.props.onCreate();
        }
      });
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
          value={this.state.comment.content}
        />
        <PhotoPicker
          onPick={this.handlePick.bind(this)}
        />
        <VideoPicker
          onPick={this.handlePick.bind(this)}
        />
        <Button
          buttonStyle={{marginTop: 10, marginBottom: 10}}
          title="Add comment"
          icon={{name: 'plus', type: 'font-awesome'}}
          backgroundColor="green"
          onPress={this.submit.bind(this)}
        />
      </View>
    );
  }
}
