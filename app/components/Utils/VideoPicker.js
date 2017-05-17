import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { COLORS } from './../../config/style';

export default class PhotoPicker extends Component
{
  constructor(props) {
    super(props);
  }

  selectVideo () {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium'
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const source = {
          uri: response.uri,
          name: 'video.mp4',
          type: 'video/mp4'
        };

        this.props.onPick('video', source);
      }
    });
  }

  render () {
    return (
      <Button
        buttonStyle={{marginTop: 5, marginBottom: 10}}
        title="Add video"
        icon={{name: 'video-camera', type: 'font-awesome'}}
        backgroundColor={COLORS.orange}
        onPress={() => this.selectVideo()}
      />
    );
  }
}
