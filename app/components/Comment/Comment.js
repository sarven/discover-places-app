import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, Button, Grid, Col } from 'react-native-elements';
import Date from './../Utils/Date';
import { getCommentUploadUrl } from './../../config/api';
import { COLORS, STYLES } from './../../config/style';

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
        <Grid>
          <Col>
            <Date date={this.state.comment.date} />
          </Col>
          {this.state.comment.photo &&
            <Col>
              <Button
                buttonStyle={STYLES.attachmentPreviewButton}
                title="Show photo"
                icon={{name: 'file-image-o', type: 'font-awesome'}}
                backgroundColor={COLORS.yellow}
                onPress={() => this.state.onPressImageButton(this.state.comment)}
              />
            </Col>
          }
          {this.state.comment.video &&
            <Col>
              <Button
                buttonStyle={STYLES.attachmentPreviewButton}
                title="Show video"
                icon={{name: 'file-video-o', type: 'font-awesome'}}
                backgroundColor={COLORS.orange}
                onPress={() => this.state.onPressVideoButton(this.state.comment)}
              />
            </Col>
          }
        </Grid>
        <Text
          style={STYLES.commentContent}
        >
            {this.state.comment.content}
        </Text>
      </Card>
    );
  }
}
