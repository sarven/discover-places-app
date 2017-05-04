import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { getMessages, getMessageUploadUrl, getCommentUploadUrl } from './../../config/api';
import { Card, Button } from 'react-native-elements';
import ReactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import Date from './../Utils/Date';
import Comment from './../Comment/Comment';
import update from 'immutability-helper';
import ImagePreviewModal from './../Utils/ImagePreviewModal';
import VideoPreviewModal from './../Utils/VideoPreviewModal';

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

  render () {
    return (
      <ScrollView>
      {
        this.state.messages.map(message => {

          return (
            <Card
              key={message.id}
              image={this.getImage(message)}
            >
              {message.photo &&
                <Button
                  buttonStyle={{marginTop: 0, marginBottom: 3}}
                  title="Show photo"
                  icon={{name: 'file-image-o', type: 'font-awesome'}}
                  backgroundColor="blue"
                  onPress={() => this.showImagePreviewModal(message)}
                />
              }
              {message.video &&
                <Button
                  buttonStyle={{marginTop: 0, marginBottom: 3}}
                  title="Show video"
                  icon={{name: 'file-video-o', type: 'font-awesome'}}
                  backgroundColor="brown"
                  onPress={() => this.showVideoPreviewModal(message)}
                />
              }
              <Date date={message.date} />
              <Text style={{marginBottom: 10}}>
                {message.content}
              </Text>
              {!message.showComments && message.comments.length > 0 &&
                <Button
                  buttonStyle={{marginTop: 10}}
                  title="Show comments"
                  icon={{name: 'comments-o', type: 'font-awesome'}}
                  backgroundColor="green"
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
                  <Button
                    buttonStyle={{marginTop: 10}}
                    title="Hide comments"
                    icon={{name: 'eye-slash', type: 'font-awesome'}}
                    backgroundColor="red"
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
