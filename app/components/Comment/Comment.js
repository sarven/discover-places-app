import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';
import Date from './../Utils/Date';
import { getCommentUploadUrl } from './../../config/api';

export default class Comment extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      comment: props.comment
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
        <Date date={this.state.comment.date} />
        <Text>{this.state.comment.content}</Text>
      </Card>
    );
  }
}
