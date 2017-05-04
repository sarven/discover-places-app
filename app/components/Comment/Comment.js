import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Date from './../Utils/Date';
import { getCommentUploadUrl } from './../../config/api';

export default class Comment extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      comment: props.comment,
      onPressImageButton: props.onPressImageButton,
      onPressVideoButton: props.onPressVideoButton
    };
  }

  getImage(comment) {
    if (comment.photo) {
      return { uri: getCommentUploadUrl(comment.photo) };
    } else if (comment.video) {
      return require('./../../img/video-placeholder.jpg');
    }

    return null;
  }

  render () {
    return (
      <Card
        key={this.state.comment.id}
        image={this.getImage(this.state.comment)}
      >
        {this.state.comment.photo &&
          <Button
            buttonStyle={{marginTop: 0, marginBottom: 3}}
            title="Show photo"
            icon={{name: 'file-image-o', type: 'font-awesome'}}
            backgroundColor="blue"
            onPress={() => this.state.onPressImageButton(this.state.comment)}
          />
        }
        {this.state.comment.video &&
          <Button
            buttonStyle={{marginTop: 0, marginBottom: 3}}
            title="Show video"
            icon={{name: 'file-video-o', type: 'font-awesome'}}
            backgroundColor="brown"
            onPress={() => this.state.onPressVideoButton(this.state.comment)}
          />
        }
        <Date date={this.state.comment.date} />
        <Text>{this.state.comment.content}</Text>
      </Card>
    );
  }
}
