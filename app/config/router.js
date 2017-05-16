
import { StackNavigator } from 'react-navigation';
import MessageList from '../components/Message/List';
import MessageCreator from '../components/Message/Creator';
import { HEADER } from '../components/Utils/Header';

export const Root = StackNavigator({
  MessageList: {
    name: 'Messages',
    screen: MessageList
  },
  MessageCreator: {
    name: 'Create Message',
    screen: MessageCreator
  }
}, {
  initialRouteName: 'MessageList',
  navigationOptions: {
    headerTitle: HEADER
  }
});
