import React, { Component } from 'react';
import { Modal, View } from 'react-native';
import { Button } from 'react-native-elements';
import VideoPlayer from 'react-native-video-player';
import { COLORS, STYLES } from './../../config/style';

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
       <View style={STYLES.modalView}>
         <Button
           buttonStyle={STYLES.closeButton}
           title="Close"
           icon={{name: 'window-close-o', type: 'font-awesome'}}
           backgroundColor={COLORS.pink}
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
