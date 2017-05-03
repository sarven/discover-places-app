import React, { Component } from 'react';
import { Modal, View } from 'react-native';
import { Button } from 'react-native-elements';
import FitImage from 'react-native-fit-image';

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
           title="Zamknij"
           icon={{name: 'window-close-o', type: 'font-awesome'}}
           backgroundColor="red"
           onPress={() => this.state.onHide()}
         />
         <FitImage
           resizeMode="contain"
           source={this.state.image}
         />
       </View>
      </Modal>
    );
  }
}
