import React, { Component } from 'react';
import { View } from 'react-native';
import CircleProgress from 'react-native-progress/Circle';
import { COLORS, STYLES } from './../../config/style';

export default class Loader extends Component
{
  constructor (props) {
    super(props);

    this.state = {
      isLoading: false,
      isCommentCreating: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoading: nextProps.navigationParams.hasOwnProperty('isLoading') ? nextProps.navigationParams.isLoading : false,
      isCommentCreating: nextProps.navigationParams.hasOwnProperty('isCommentCreating') ? nextProps.navigationParams.isCommentCreating : false,
    });
  }

  render () {
    return (
      <View style={STYLES.loader}>
        {(this.state.isLoading || this.state.isCommentCreating) &&
          <CircleProgress
            size={20}
            indeterminate={true}
            color={COLORS.blue}
          />
        }
      </View>
    );
  }
}
