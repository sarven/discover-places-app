import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

export default class PhotoPicker extends Component
{
  constructor(props) {
    super(props);
  }

  selectPhoto() {
    const options = {
      quality: 1.0,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
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
          name: response.fileName,
          type: response.type
        };

        this.props.onPick('photo', source);
      }
    });
  }

  render () {
    return (
      <Button
        buttonStyle={{marginTop: 10, marginBottom: 5}}
        title="Add photo"
        icon={{name: 'camera', type: 'font-awesome'}}
        backgroundColor="blue"
        onPress={() => this.selectPhoto()}
      />
    );
  }
}
