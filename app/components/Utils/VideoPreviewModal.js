import React, { Component } from 'react';
import { Modal, View } from 'react-native';
import { Button } from 'react-native-elements';
import VideoPlayer from 'react-native-video-player';

export default class VideoPreviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      video: props.video,
      onHide: props.onHide
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show,
      video: nextProps.video,
      onHide: nextProps.onHide
    });
  }

  render () {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.props.show}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
       <View style={{margin:0}}>
         <Button
           buttonStyle={{
             position: 'absolute',
             top: 0,
             right: 0,
             zIndex: 9999
           }}
           title="Close"
           icon={{name: 'window-close-o', type: 'font-awesome'}}
           backgroundColor="red"
           onPress={() => this.state.onHide()}
         />
        <VideoPlayer
          video={this.state.video}
          resizeMode="cover"
        />
       </View>
      </Modal>
    );
  }
}
