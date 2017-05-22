import React, { Component } from 'react';
import { Modal, View } from 'react-native';
import { Button } from 'react-native-elements';
import FitImage from 'react-native-fit-image';
import { COLORS, STYLES } from './../../config/style';

export default class ImagePreviewModal extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      image: props.image,
      onHide: props.onHide
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show,
      image: nextProps.image,
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
          console.log('Image Modal has been closed.');
        }}
      >
       <View style={STYLES.modalView}>
         <FitImage
           resizeMode="contain"
           source={this.state.image}
         />
         <Button
           buttonStyle={STYLES.closeButton}
           title="Close"
           icon={{name: 'window-close-o', type: 'font-awesome'}}
           backgroundColor={COLORS.pink}
           onPress={() => this.state.onHide()}
         />
       </View>
      </Modal>
    );
  }
}
