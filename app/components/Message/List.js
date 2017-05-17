import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { getMessages, getMessageUploadUrl, getCommentUploadUrl } from './../../config/api';
import { Card, Button, Grid, Col, Divider } from 'react-native-elements';
import ReactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import Date from './../Utils/Date';
import Comment from './../Comment/Comment';
import update from 'immutability-helper';
import ImagePreviewModal from './../Utils/ImagePreviewModal';
import VideoPreviewModal from './../Utils/VideoPreviewModal';
import CommentCreator from './../Comment/Creator';
import { COLORS, STYLES } from './../../config/style';

const REFRESH_TIME = 15000;

export default class List extends Component {
  constructor () {
    super();

    this.state = {
      messages: [],
      position: {
        lat: 0,
        long: 0
      },
      imagePreview: null,
      showImagePreviewModal: false,
      videoPreview: null,
      showVideoPreviewModal: false
    };
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
        let data = responseJson.data;
        const messages = data.map(item => {
          let message = item[0];
          message.showComments = false;

          return message;
        });

        this.updateMessages(messages);
      })
      .catch(e => {
        console.error(e);
      });
  }

  updateMessages (messages) {
    messages.forEach(message => {
      const existingMessage = this.state.messages.find(item => item.id === message.id);
      if (existingMessage) {
        message.showComments = existingMessage.showComments;
      }
    });

    this.setState({
      messages: messages
    });
  }

  getImage(item) {
    if (item.photo) {
      return { uri: this.getUploadUrl(item, 'photo') };
    } else if (item.video) {
      return require('./../../img/video-placeholder.jpg');
    }

    return null;
  }

  getVideo(item) {
    if (item.video) {
      return { uri: this.getUploadUrl(item, 'video') };
    }

    return null;
  }

  getUploadUrl(item, resource) {
    return item.scope ? getMessageUploadUrl(item[resource]) : getCommentUploadUrl(item[resource]);
  }

  toggleComments (message, show) {
    const index = this.state.messages.findIndex(item => item.id === message.id);
    const messages = update(this.state.messages, {
      [index]: {
        showComments: {
          $set: show
        }
      }
    });
    this.setState({
      messages: messages
    });
  }

  showImagePreviewModal (item) {
    this.setState({
      imagePreview: this.getImage(item),
      showImagePreviewModal: true
    });
  }

  hideImagePreviewModal () {
    this.setState({
      imagePreview: null,
      showImagePreviewModal: false
    });
  }

  showVideoPreviewModal (item) {
    this.setState({
      videoPreview: this.getVideo(item),
      showVideoPreviewModal: true
    });
  }

  hideVideoPreviewModal () {
    this.setState({
      videoPreview: null,
      showVideoPreviewModal: false
    });
  }

  onCreateComment() {
    this.getPosition();
  }

  render () {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView>
        <Button
          buttonStyle={STYLES.createMessageButton}
          title="Add message"
          icon={{name: 'plus', type: 'font-awesome'}}
          backgroundColor={COLORS.blue}
          large={true}
          onPress={() => navigate('MessageCreator')}
        />
        {
          this.state.messages.map(message => {

            return (
              <Card
                key={message.id}
                image={this.getImage(message)}
              >
                <Grid>
                  <Col>
                    <Date date={message.date} />
                  </Col>
                  {message.photo &&
                  <Col>
                    <Button
                      title="Photo"
                      icon={{name: 'file-image-o', type: 'font-awesome'}}
                      onPress={() => this.showImagePreviewModal(message)}
                      buttonStyle={STYLES.attachmentPreviewButton}
                      backgroundColor={COLORS.yellow}
                    />
                  </Col>
                  }
                  {message.video &&
                    <Col>
                      <Button
                        title="Video"
                        icon={{name: 'file-video-o', type: 'font-awesome'}}
                        onPress={() => this.showVideoPreviewModal(message)}
                        buttonStyle={STYLES.attachmentPreviewButton}
                        backgroundColor={COLORS.orange}
                      />
                    </Col>
                  }
                </Grid>
                <Divider/>
                <Text style={STYLES.messageContent}>
                  {message.content}
                </Text>
                {!message.showComments &&
                  <Button
                    buttonStyle={STYLES.toggleCommentsButton}
                    title={message.comments.length > 0 ? 'Show comments' : 'Add comment'}
                    icon={{name: 'comments-o', type: 'font-awesome'}}
                    backgroundColor={COLORS.blue}
                    onPress={() => this.toggleComments(message, true)}
                  />
                }
                {message.showComments &&
                  <View>
                    {
                      message.comments.map(c => {
                        return (
                          <Comment
                            key={c.id}
                            comment={c}
                            onPressImageButton={this.showImagePreviewModal.bind(this)}
                            onPressVideoButton={this.showVideoPreviewModal.bind(this)}
                          />
                        );
                      })
                    }
                    <CommentCreator
                      messageId={message.id}
                      onCreate={this.onCreateComment.bind(this)}
                    />
                    <Button
                      buttonStyle={STYLES.toggleCommentsButton}
                      title={message.comments.length > 0 ? 'Hide comments' : 'Hide comment form'}
                      icon={{name: 'eye-slash', type: 'font-awesome'}}
                      backgroundColor={COLORS.pink}
                      onPress={() => this.toggleComments(message, false)}
                    />
                  </View>
                }
              </Card>
            );
          })
        }
        <ImagePreviewModal
          show={this.state.showImagePreviewModal}
          image={this.state.imagePreview}
          onHide={this.hideImagePreviewModal.bind(this)}
        />
        <VideoPreviewModal
          show={this.state.showVideoPreviewModal}
          video={this.state.videoPreview}
          onHide={this.hideVideoPreviewModal.bind(this)}
        />
      </ScrollView>
    );
  }
}

ReactMixin.onClass(List, TimerMixin);
