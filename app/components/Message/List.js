import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { getMessages, getMessageUploadUrl } from './../../config/api';
import { Card, Button } from 'react-native-elements';
import ReactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import Date from './../Utils/Date';
import Comment from './../Comment/Comment';
import update from 'immutability-helper';
import ImagePreviewModal from './../Utils/ImagePreviewModal';

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
      showImagePreviewModal: false
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

        this.setState({
          messages: messages
        });
      })
      .catch(e => {
        console.error(e);
      });
  }

  getImage(message) {
    if (message.photo) {
      return { uri: getMessageUploadUrl(message.photo) };
    } else if (message.video) {
      return require('./../../img/video-placeholder.jpg');
    }

    return null;
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

  showImagePreviewModal (message) {
    this.setState({
      imagePreview: this.getImage(message),
      showImagePreviewModal: true
    });
  }

  hideImagePreviewModal () {
    this.setState({
      imagePreview: null,
      showImagePreviewModal: false
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
                  buttonStyle={{marginTop: 2, marginBottom: 2}}
                  title="Pokaż zdjęcie"
                  icon={{name: 'eye', type: 'font-awesome'}}
                  backgroundColor="blue"
                  onPress={() => this.showImagePreviewModal(message)}
                />
              }
              <Date date={message.date} />
              <Text style={{marginBottom: 10}}>
                {message.content}
              </Text>
              {!message.showComments && message.comments.length > 0 &&
                <Button
                  buttonStyle={{marginTop: 10}}
                  title="Pokaż komentarze"
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
                        <Comment key={c.id} comment={c} />
                      );
                    })
                  }
                  <Button
                    buttonStyle={{marginTop: 10}}
                    title="Ukryj komentarze"
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
      </ScrollView>
    );
  }
}

ReactMixin.onClass(List, TimerMixin);
