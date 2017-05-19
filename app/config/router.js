import React from 'react';
import { StackNavigator } from 'react-navigation';
import MessageList from '../components/Message/List';
import MessageCreator from '../components/Message/Creator';
import { HEADER } from '../components/Utils/Header';
import Loader from '../components/Utils/Loader';

export const Root = StackNavigator({
  MessageList: {
    name: 'Messages',
    screen: MessageList
  },
  MessageCreator: {
    name: 'Create Message',
    screen: MessageCreator,
    params: {
      isLoading: false
    }
  }
}, {
  initialRouteName: 'MessageList',
  initialRouteParams: {
    isLoading: false
  },
  navigationOptions: ({navigation}) => ({
    headerTitle: HEADER,
    headerRight: (<Loader navigationParams={navigation.state.params}/>)
  })
});
