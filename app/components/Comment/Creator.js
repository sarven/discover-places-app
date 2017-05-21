import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createComment, HTTP_CREATED } from './../../config/api';
import update from 'immutability-helper';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import PhotoPicker from './../Utils/PhotoPicker';
import VideoPicker from './../Utils/VideoPicker';
import { COLORS, STYLES } from './../../config/style';

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
    const { content, photo, video } = this.state.comment;
    const valid = !!(content || photo || video);

    this.setState({valid: valid});
  }

  submit () {
    this.validate();
    if (!this.state.valid) {
      return false;
    }
    this.props.onCommentCreating();
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
            style={STYLES.error}
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
          buttonStyle={STYLES.submit}
          title="Add comment"
          icon={{name: 'plus', type: 'font-awesome'}}
          backgroundColor={COLORS.blue}
          onPress={this.submit.bind(this)}
        />
      </View>
    );
  }
}
